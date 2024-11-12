
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
import ReplaceMenuProvider, { BpmnFactory, BpmnReplace, Moddle, ModdleCopy, Modeling, PopupMenu, PopupMenuEntryAction, ReplaceOption, Rules, Translate, Element } from 'bpmn-js/lib/features/popup-menu/ReplaceMenuProvider';

class EasyFlowablePopupMenuProvider extends ReplaceMenuProvider {

    static $inject: string[] = [
        'bpmnFactory',
        'popupMenu',
        'modeling',
        'moddle',
        'bpmnReplace',
        'rules',
        'translate',
        'moddleCopy'
    ];

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
        super(bpmnFactory, popupMenu, modeling, moddle, bpmnReplace, rules, translate, moddleCopy);
        this.bpmnFactory = bpmnFactory;
        this.popupMenu = popupMenu;
        this.modeling = modeling;
        this.moddle = moddle;
        this.bpmnReplace = bpmnReplace;
        this.rules = rules;
        this.translate = translate;
        this.moddleCopy = moddleCopy;
    }

    /**
     * 多实例面板头部
     * @param target
     * @returns
     */
    _getLoopCharacteristicsHeaderEntries = (target: Element) => {
        // 只有用户任务支持多实例
        if (target.type !== 'bpmn:UserTask') {
            return {};
        }
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

}

export const EasyFlowablePopupMenu = {
    replaceMenuProvider: ['type', EasyFlowablePopupMenuProvider]
};
