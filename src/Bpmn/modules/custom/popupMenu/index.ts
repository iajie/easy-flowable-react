
/**
 * @Date: 2024-10-4 13:22:27
 * @Description: 自定义修改工具菜单栏
 * @Author: MoJie
 */
import { getBusinessObject, is, ModdleElement } from 'bpmn-js/lib/util/ModelUtil';
import { isEventSubProcess, isExpanded } from 'bpmn-js/lib/util/DiUtil';
import { isDifferentType } from 'bpmn-js/lib/features/popup-menu/util/TypeUtil';
import * as replaceOptions from 'bpmn-js/lib/features/replace/ReplaceOptions';
import { canBeNonInterrupting, getInterruptingProperty } from 'bpmn-js/lib/features/modeling/behavior/util/NonInterruptingUtil';
import Icons from 'bpmn-js/lib/features/popup-menu/util/Icons';
import { BpmnFactory, BpmnReplace, Moddle, ModdleCopy, Modeling, PopupMenu, PopupMenuEntryAction, ReplaceOption, Rules, Translate, Element } from 'bpmn-js/lib/features/popup-menu/ReplaceMenuProvider';

class EasyFlowablePopupMenuProvider {
    popupMenu: PopupMenu;
    bpmnFactory: BpmnFactory;
    modeling: Modeling;
    moddle: Moddle;
    bpmnReplace: BpmnReplace;
    rules: Rules;
    translate: Translate;
    moddleCopy: ModdleCopy;
    constructor(bpmnFactory: BpmnFactory, popupMenu: PopupMenu, modeling: Modeling, moddle: Moddle,
        bpmnReplace: BpmnReplace, rules: Rules, translate: Translate, moddleCopy: ModdleCopy) {
        this.bpmnFactory = bpmnFactory;
        this.popupMenu = popupMenu;
        this.modeling = modeling;
        this.moddle = moddle;
        this.bpmnReplace = bpmnReplace;
        this.rules = rules;
        this.translate = translate;
        this.moddleCopy = moddleCopy;
        this.register();
    }

    register = () => {
        this.popupMenu.registerProvider('bpmn-replace', this);
    }

    getPopupMenuHeaderEntries = (target: Element) => {
        let headerEntries = {};
        if (is(target, 'bpmn:Activity') && !isEventSubProcess(target)) {
            headerEntries = {
                ...headerEntries,
                ...this.getLoopCharacteristicsHeaderEntries(target)
            };
        }
        if (is(target, 'bpmn:DataObjectReference')) {
            headerEntries = {
                ...headerEntries,
                ...this.getCollectionHeaderEntries(target)
            };
        }
        if (is(target, 'bpmn:Participant')) {
            headerEntries = {
                ...headerEntries,
                ...this.getParticipantMultiplicityHeaderEntries(target)
            };
        }
        if (is(target, 'bpmn:SubProcess') &&
            !is(target, 'bpmn:Transaction') &&
            !isEventSubProcess(target)) {
            headerEntries = {
                ...headerEntries,
                ...this.getAdHocHeaderEntries(target)
            };
        }
        if (canBeNonInterrupting(target)) {
            headerEntries = {
                ...headerEntries,
                ...this.getNonInterruptingHeaderEntries(target)
            };
        }
        return headerEntries;
    }

    createEntries = (target: Element, replaceOptions: ReplaceOption[]) => {
        const entries: any = {};
        replaceOptions.forEach(replaceOption => {
            entries[replaceOption.actionName] = this.createEntry(replaceOption, target);
        });
        return entries;
    }

    createEntry = (replaceOption: ReplaceOption, target: Element, action?: PopupMenuEntryAction) => {
        const replaceAction = () => {
            if (!replaceOption.target?.eventDefinitionAttrs?.type) {
                return this.bpmnReplace.replaceElement(target, replaceOption.target);
            }
        };
        let label = replaceOption.label;
        if (label && typeof label === 'function') {
            label = label(target);
        }
        action = action || replaceAction;
        return {
            label: this.translate(label),
            className: replaceOption.className,
            action: action
        };
    }

    createSequenceFlowEntries = (target: Element, replaceOptions: ReplaceOption[]) => {
        const businessObject = getBusinessObject(target);
        let entries = {};
        replaceOptions.forEach(replaceOption => {
            switch (replaceOption.actionName) {
                case 'replace-with-default-flow':
                    if (businessObject.sourceRef.default !== businessObject && (is(businessObject.sourceRef, 'bpmn:ExclusiveGateway') ||
                        is(businessObject.sourceRef, 'bpmn:InclusiveGateway') || is(businessObject.sourceRef, 'bpmn:ComplexGateway') ||
                        is(businessObject.sourceRef, 'bpmn:Activity'))) {
                        entries = {
                            ...entries,
                            [replaceOption.actionName]: this.createEntry(replaceOption, target, () => {
                                this.modeling.updateProperties(target.source, { default: businessObject });
                            })
                        };
                    }
                    break;
                case 'replace-with-conditional-flow':
                    if (!businessObject.conditionExpression && is(businessObject.sourceRef, 'bpmn:Activity')) {
                        entries = {
                            ...entries,
                            [replaceOption.actionName]: this.createEntry(replaceOption, target, () => {
                                const conditionExpression = this.moddle.create('bpmn:FormalExpression', { body: '' });
                                this.modeling.updateProperties(target, { conditionExpression: conditionExpression });
                            })
                        };
                    }
                    break;
                default:
                    // conditional flow -> sequence flow
                    if (is(businessObject.sourceRef, 'bpmn:Activity') && businessObject.conditionExpression) {
                        entries = {
                            ...entries,
                            [replaceOption.actionName]: this.createEntry(replaceOption, target, () => {
                                this.modeling.updateProperties(target, { conditionExpression: undefined });
                            })
                        };
                    }

                    // default flow -> sequence flow
                    if ((is(businessObject.sourceRef, 'bpmn:ExclusiveGateway') || is(businessObject.sourceRef, 'bpmn:InclusiveGateway') ||
                        is(businessObject.sourceRef, 'bpmn:ComplexGateway') || is(businessObject.sourceRef, 'bpmn:Activity')) && businessObject.sourceRef.default === businessObject) {
                        entries = {
                            ...entries,
                            [replaceOption.actionName]: this.createEntry(replaceOption, target, () => {
                                this.modeling.updateProperties(target.source, { default: undefined });
                            })
                        };
                    }
            }
        });
        return entries;
    }

    /**
     * 多实例面板头部
     * @param target 
     * @returns 
     */
    getLoopCharacteristicsHeaderEntries = (target: Element) => {
        const toggleLoopEntry = (event: any, entry: Element) => {
            // remove
            if (entry.active) {
                this.modeling.updateProperties(target, { loopCharacteristics: undefined });
                return;
            }
            const currentLoopCharacteristics = target.businessObject.get('loopCharacteristics'), newLoopCharacteristics = this.moddle.create(entry.options.loopCharacteristics);
            // copy old properties
            if (currentLoopCharacteristics) {
                this.moddleCopy.copyElement(currentLoopCharacteristics, newLoopCharacteristics);
            }
            // update `isSequential` property
            newLoopCharacteristics.set('isSequential', entry.options.isSequential);
            this.modeling.updateProperties(target, { loopCharacteristics: newLoopCharacteristics });
        }
        const businessObject = getBusinessObject(target), loopCharacteristics = businessObject.loopCharacteristics;
        let isSequential, isLoop, isParallel;
        if (loopCharacteristics) {
            isSequential = loopCharacteristics.isSequential;
            isLoop = loopCharacteristics.isSequential === undefined;
            isParallel = loopCharacteristics.isSequential !== undefined && !loopCharacteristics.isSequential;
        }
        return {
            'toggle-parallel-mi': {
                className: 'bpmn-icon-parallel-mi-marker',
                title: this.translate('Parallel multi-instance'),
                active: isParallel,
                action: toggleLoopEntry,
                options: {
                    loopCharacteristics: 'bpmn:MultiInstanceLoopCharacteristics',
                    isSequential: false
                }
            },
            'toggle-sequential-mi': {
                className: 'bpmn-icon-sequential-mi-marker',
                title: this.translate('Sequential multi-instance'),
                active: isSequential,
                action: toggleLoopEntry,
                options: {
                    loopCharacteristics: 'bpmn:MultiInstanceLoopCharacteristics',
                    isSequential: true
                }
            },
            // 'toggle-loop': {
            //     className: 'bpmn-icon-loop-marker',
            //     title: this.translate('Loop'),
            //     active: isLoop,
            //     action: toggleLoopEntry,
            //     options: {
            //         loopCharacteristics: 'bpmn:StandardLoopCharacteristics'
            //     }
            // }
        };
    }

    getCollectionHeaderEntries = (target: Element) => {
        const dataObject = target.businessObject.dataObjectRef;
        if (!dataObject) {
            return {};
        }
        const toggleIsCollection = (event: any, entry: Element) => {
            this.modeling.updateModdleProperties(target, dataObject, { isCollection: !entry.active });
        }
        const isCollection = dataObject.isCollection;
        return {
            'toggle-is-collection': {
                className: 'bpmn-icon-parallel-mi-marker',
                title: this.translate('Collection'),
                active: isCollection,
                action: toggleIsCollection,
            }
        };
    }

    getParticipantMultiplicityHeaderEntries = (target: Element) => {
        const toggleParticipantMultiplicity = (event: any, entry: Element) => {
            const isActive = entry.active;
            let participantMultiplicity;
            if (!isActive) {
                participantMultiplicity = this.bpmnFactory.create('bpmn:ParticipantMultiplicity');
            }
            this.modeling.updateProperties(target, { participantMultiplicity: participantMultiplicity });
        }
        const participantMultiplicity = target.businessObject.participantMultiplicity;
        return {
            'toggle-participant-multiplicity': {
                className: 'bpmn-icon-parallel-mi-marker',
                title: this.translate('Participant multiplicity'),
                active: !!participantMultiplicity,
                action: toggleParticipantMultiplicity,
            }
        };
    }

    getAdHocHeaderEntries = (element: ModdleElement) => {
        const businessObject = getBusinessObject(element);
        const isAdHoc = is(businessObject, 'bpmn:AdHocSubProcess');
        const replaceElement = this.bpmnReplace.replaceElement;
        return {
            'toggle-adhoc': {
                className: 'bpmn-icon-ad-hoc-marker',
                title: this.translate('Ad-hoc'),
                active: isAdHoc,
                action: (event: any, entry: Element) => {
                    if (isAdHoc) {
                        // @ts-ignore
                        return replaceElement(element, { type: 'bpmn:SubProcess' }, {
                            autoResize: false,
                            layoutConnection: false
                        });
                    } else {
                        // @ts-ignore
                        return replaceElement(element, { type: 'bpmn:AdHocSubProcess' }, {
                            autoResize: false,
                            layoutConnection: false
                        });
                    }
                }
            }
        };
    }

    getNonInterruptingHeaderEntries = (element: Element) => {
        const businessObject = getBusinessObject(element);
        const interruptingProperty = getInterruptingProperty(element);
        const icon = is(element, 'bpmn:BoundaryEvent') ? Icons['intermediate-event-non-interrupting'] : Icons['start-event-non-interrupting'];
        const isNonInterrupting = !businessObject[interruptingProperty];
        return {
            'toggle-non-interrupting': {
                imageHtml: icon,
                title: this.translate('Toggle non-interrupting'),
                active: isNonInterrupting,
                action: () => {
                    this.modeling.updateProperties(element, {
                        [interruptingProperty]: !!isNonInterrupting
                    });
                }
            }
        };
    }

    createServiceTaskEntries = (element: Element, replaceOptions: ReplaceOption[]) => {

    }

    getPopupMenuEntries = (target: Element) => {
        const businessObject = target.businessObject;
        if (target instanceof Array || !this.rules.allowed('shape.replace', { element: target })) {
            return {};
        }
        const differentType = isDifferentType(target);
        if (is(businessObject, 'bpmn:DataObjectReference')) {
            return this.createEntries(target, replaceOptions.DATA_OBJECT_REFERENCE);
        }
        if (is(businessObject, 'bpmn:DataStoreReference') && !is(target.parent, 'bpmn:Collaboration')) {
            return this.createEntries(target, replaceOptions.DATA_STORE_REFERENCE);
        }
        // start events outside sub processes
        let filteredReplaceOptions = [];
        if (is(businessObject, 'bpmn:StartEvent') && !is(businessObject.$parent, 'bpmn:SubProcess')) {
            filteredReplaceOptions = replaceOptions.START_EVENT.filter(i => i.target?.type === target.type);
            return this.createEntries(target, filteredReplaceOptions);
        }

        // expanded/collapsed pools
        if (is(businessObject, 'bpmn:Participant')) {
            filteredReplaceOptions = replaceOptions.PARTICIPANT.filter(replaceOption => isExpanded(target) !== replaceOption.target?.isExpanded)
            return this.createEntries(target, filteredReplaceOptions);
        }

        // start events inside event sub processes
        if (is(businessObject, 'bpmn:StartEvent') && isEventSubProcess(businessObject.$parent)) {
            filteredReplaceOptions = replaceOptions.EVENT_SUB_PROCESS_START_EVENT.filter(replaceOption => {
                const target = replaceOption.target;
                const isInterrupting = target?.isInterrupting !== false;
                const isInterruptingEqual = businessObject.isInterrupting === isInterrupting;
                // filters elements which types and event definition are equal but have have different interrupting types
                return differentType(replaceOption as any) || !differentType(replaceOption as any) && !isInterruptingEqual;
            })
            return this.createEntries(target, filteredReplaceOptions);
        }

        // start events inside sub processes
        if (is(businessObject, 'bpmn:StartEvent') && !isEventSubProcess(businessObject.$parent) && is(businessObject.$parent, 'bpmn:SubProcess')) {
            filteredReplaceOptions = replaceOptions.START_EVENT_SUB_PROCESS.filter(i => i.target?.type == target.type);
            return this.createEntries(target, filteredReplaceOptions);
        }

        // end events
        if (is(businessObject, 'bpmn:EndEvent')) {
            filteredReplaceOptions = replaceOptions.END_EVENT.filter((replaceOption: ReplaceOption) => {
                const target = replaceOption.target;
                // hide cancel end events outside transactions
                if (target.eventDefinitionType == 'bpmn:CancelEventDefinition' && !is(businessObject.$parent, 'bpmn:Transaction')) {
                    return false;
                }
                return differentType(replaceOption);
            });
            return this.createEntries(target, filteredReplaceOptions);
        }

        // boundary events
        if (is(businessObject, 'bpmn:BoundaryEvent')) {
            filteredReplaceOptions = replaceOptions.BOUNDARY_EVENT.filter((replaceOption: ReplaceOption) => {
                const target = replaceOption.target;
                if (target.eventDefinitionType == 'bpmn:CancelEventDefinition' && !is(businessObject.attachedToRef, 'bpmn:Transaction')) {
                    return false;
                }
                const cancelActivity = target.cancelActivity !== false;
                const isCancelActivityEqual = businessObject.cancelActivity == cancelActivity;
                return differentType(replaceOption) || !differentType(replaceOption) && !isCancelActivityEqual;
            });
            return this.createEntries(target, filteredReplaceOptions);
        }

        // intermediate events
        if (is(businessObject, 'bpmn:IntermediateCatchEvent') || is(businessObject, 'bpmn:IntermediateThrowEvent')) {
            filteredReplaceOptions = replaceOptions.INTERMEDIATE_EVENT.filter(item => item.target?.type == target.type);
            return this.createEntries(target, filteredReplaceOptions);
        }

        // gateways
        if (is(businessObject, 'bpmn:Gateway')) {
            filteredReplaceOptions = replaceOptions.GATEWAY.filter(item => item.target?.type == target.type);
            return this.createEntries(target, filteredReplaceOptions);
        }

        // transactions
        if (is(businessObject, 'bpmn:Transaction')) {
            filteredReplaceOptions = replaceOptions.TRANSACTION.filter(item => item.target?.type == target.type);
            return this.createEntries(target, filteredReplaceOptions);
        }

        // expanded event sub processes
        if (isEventSubProcess(businessObject) && isExpanded(target)) {
            filteredReplaceOptions = replaceOptions.EVENT_SUB_PROCESS.filter(item => item.target?.type == target.type);
            return this.createEntries(target, filteredReplaceOptions);
        }

        // expanded sub processes
        if (is(businessObject, 'bpmn:SubProcess') && isExpanded(target)) {
            filteredReplaceOptions = replaceOptions.SUBPROCESS_EXPANDED.filter(item => item.target?.type == target.type);
            return this.createEntries(target, filteredReplaceOptions);
        }

        // collapsed ad hoc sub processes
        if (is(businessObject, 'bpmn:AdHocSubProcess') && !isExpanded(target)) {
            filteredReplaceOptions = replaceOptions.TASK.filter(replaceOption => {
                const target = replaceOption.target;
                if (target) {
                    const isTargetSubProcess = target.type === 'bpmn:SubProcess';
                    const isTargetExpanded = target.isExpanded === true;
                    return isDifferentType(target as any) && (!isTargetSubProcess || isTargetExpanded);
                }
            });
            // filteredReplaceOptions = filter(replaceOptions.TASK, (replaceOption: ReplaceOption) => {
            //     const target = replaceOption.target;
            //     const isTargetSubProcess = target.type === 'bpmn:SubProcess';
            //     const isTargetExpanded = target.isExpanded === true;
            //     return isDifferentType(target) && (!isTargetSubProcess || isTargetExpanded);
            // });
            return this.createEntries(target, filteredReplaceOptions);
        }

        // sequence flows
        if (is(businessObject, 'bpmn:SequenceFlow')) {
            return this.createSequenceFlowEntries(target, replaceOptions.SEQUENCE_FLOW);
        }

        // service email
        // if (is(businessObject, 'bpmn:ServiceTask')) {
        //     return this.createServiceTaskEntries(target, replaceOptions.TASK);
        // }

        // flow nodes
        if (is(businessObject, 'bpmn:FlowNode')) {
            // if (!replaceOptions.TASK.some(item => item.actionName == 'replace-with-mail-task')) {
            //     replaceOptions.TASK.splice(3, 0, {
            //         label: 'Mail task',
            //         actionName: 'replace-with-mail-task',
            //         className: 'bpmn-icon-send',
            //         target: {
            //             type: 'bpmn:ServiceTask',
            //         }
            //     });
            // }
            filteredReplaceOptions = replaceOptions.TASK.filter(i => i.target?.type != target.type);
            // collapsed sub process cannot be replaced with itself
            if (is(businessObject, 'bpmn:SubProcess') && !isExpanded(target)) {
                filteredReplaceOptions = filteredReplaceOptions.filter((replaceOption: ReplaceOption) => {
                    return replaceOption.label !== 'Sub-process (collapsed)';
                });
            }
            return this.createEntries(target, filteredReplaceOptions);
        }

        return {};
    }
}

export const EasyFlowablePopupMenu = {
    replaceMenuProvider: ['type', EasyFlowablePopupMenuProvider]
};