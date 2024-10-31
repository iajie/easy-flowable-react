import {
    AppendPreview,
    Canvas,
    Connect,
    ContextPad,
    ContextPadConfig, Create,
    ElementFactory,
    EventBus,
    Injector, PopupMenu, Rules, Translate
} from "bpmn-js/lib/features/context-pad/ContextPadProvider";

class EasyFlowableContextPadProvider {
    contextPad: any;
    modeling: any;
    elementFactory: ElementFactory;
    connect: any;
    create: any;
    popupMenu: any;
    rules: any;
    translate: any;
    appendPreview: any;

    constructor(
        config: ContextPadConfig, injector: Injector, eventBus: EventBus, contextPad: ContextPad,
        modeling: ContextPad, elementFactory: ElementFactory, connect: Connect, create: Create,
        popupMenu: PopupMenu, canvas: Canvas, rules: Rules, translate: Translate, appendPreview: AppendPreview) {
        // @ts-ignore 不注冊
        // contextPad.registerProvider(this);
        this.contextPad = contextPad;
        this.modeling = modeling;
        this.elementFactory = elementFactory;
        this.connect = connect;
        this.create = create;
        this.popupMenu = popupMenu;
        this.rules = rules;
        this.translate = translate;
        this.appendPreview = appendPreview;
    }

}

export const EasyFlowableContextPad = {
    contextPadProvider: ['type', EasyFlowableContextPadProvider]
};
