import ContextPadProvider, {
    ContextPadConfig, Injector, EventBus, ContextPad, Element, Modeling,
    ElementFactory, Connect, Create, PopupMenu, Canvas, Rules, Translate, AppendPreview, ModdleElement,
} from 'bpmn-js/lib/features/context-pad/ContextPadProvider';

class EasyFlowableContextPadProvider extends ContextPadProvider {
    contextPad: any;
    modeling: any;
    elementFactory: ElementFactory;
    connect: any;
    create: any;
    popupMenu: any;
    rules: any;
    translate: any;
    appendPreview: any;
    autoPlace: any;

    constructor(config: ContextPadConfig, injector: Injector, eventBus: EventBus, contextPad: ContextPad, modeling: Modeling, elementFactory: ElementFactory,
        connect: Connect, create: Create, popupMenu: PopupMenu, canvas: Canvas, rules: Rules, translate: Translate, appendPreview: AppendPreview) {
        super(config, injector, eventBus, contextPad, modeling, elementFactory,
            connect, create, popupMenu, canvas, rules, translate, appendPreview);
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
