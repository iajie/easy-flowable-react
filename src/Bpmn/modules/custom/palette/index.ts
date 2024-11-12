import PaletteProvider, {
    Palette, Create, ElementFactory, SpaceTool, LassoTool,
    HandTool, GlobalConnect, Translate
} from 'bpmn-js/lib/features/palette/PaletteProvider';

class EasyFlowablePaletteProvider extends PaletteProvider {
    palette: Palette;
    create: Create;
    elementFactory: ElementFactory;
    spaceTool: SpaceTool;
    lassoTool: LassoTool;
    handTool: HandTool;
    globalConnect: GlobalConnect;
    translate: Translate;
    constructor(
        palette: Palette, create: Create, elementFactory: ElementFactory,
        spaceTool: SpaceTool, lassoTool: LassoTool, handTool: HandTool,
        globalConnect: GlobalConnect, translate: Translate) {
        super(palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect, translate);
        this.palette = palette;
        this.create = create;
        this.elementFactory = elementFactory;
        this.spaceTool = spaceTool;
        this.lassoTool = lassoTool;
        this.handTool = handTool;
        this.globalConnect = globalConnect;
        this.translate = translate;
    }

}

export const EasyFlowablePalette = {
    paletteProvider: ['type', EasyFlowablePaletteProvider]
};
