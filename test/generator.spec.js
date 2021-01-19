"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by eddy spreeuwers on 14-02-18.
 */
var fs = require("fs");
var ts = require("typescript");
var xml_utils_1 = require("../src/xml-utils");
var index_1 = require("../src/index");
function xsdPath(name) {
    return "./test/xsd/" + name + ".xsd";
}
xml_utils_1.useVerboseLogModus();
describe("generator", function () {
    it(" has function generateTemplateClassesFromXSD", function () {
        expect(index_1.generateTemplateClassesFromXSD).toBeDefined();
    });
    it("creates simpleClass.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD(xsdPath("simpleClass"), { Xs: "./ns" }));
        printFile("./src/generated/simpleClass.ts");
    });
    it("creates importedClass.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/importedClass.xsd", {
            dep: "./ns",
        }));
        printFile("./src/generated/importedClass.ts");
        compile("./src/generated/importedClass.ts");
    });
    it("creates simpleInheritedClass.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/simpleInheritedClass.xsd", {
            Xs: "./ns",
        }));
        printFile("./src/generated/simpleInheritedClass.ts");
        compile("./src/generated/simpleInheritedClass.ts");
    });
    it("creates xep-004.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/xep-004.xsd", { jabber: "./ns" }, "jabber"));
        printFile("./src/generated/xep-004.ts");
        compile("./src/generated/xep-004.ts");
    });
    it("creates heeft een types property", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/simpleType.xsd"));
        printFile("./src/generated/simpleType.ts");
        compile("./src/generated/simpleType.ts");
    });
    it("creates group.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/group.xsd"));
        printFile("./src/generated/group.ts");
        compile("./src/generated/group.ts");
    });
    it("creates types.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/types.xsd"));
        printFile("./src/generated/types.ts");
        compile("./src/generated/types.ts");
    });
    it("creates element.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/element.xsd", { Xs: "./ns" }));
        printFile("./src/generated/element.ts");
        compile("./src/generated/element.ts");
    });
    it("creates capabilities_1_3_0.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/capabilities_1_3_0.xsd", {
            wms: "./wms",
        }));
        printFile("./src/generated/capabilities_1_3_0.ts");
        compile("./src/generated/capabilities_1_3_0.ts");
    });
    it("creates defNamespace.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/defNamespace.xsd", {
            dep: "./ns",
        }));
        printFile("./src/generated/defNamespace.ts");
        compile("./src/generated/defNamespace.ts");
    });
    it("creates inversedNamespace.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/inversedNamespace.xsd", { dep: "./ns" }, "dep"));
        printFile("./src/generated/inversedNamespace.ts");
        compile("./src/generated/inversedNamespace.ts");
    });
    it("creates dep.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/dep.xsd"));
        printFile("./src/generated/dep.ts");
        compile("./src/generated/dep.ts");
    });
    it("creates a single element schema.ts", function () {
        expect(index_1.generateTemplateClassesFromXSD("./test/xsd/singleElm.xsd"));
        printFile("./src/generated/singleElm.ts");
        compile("./src/generated/singleElm.ts");
    });
    // fit("creates a isdoc-invoice-6.0.1.ts", () => {
    //     expect(generateTemplateClassesFromXSD("./test/xsd/isdoc-invoice-6.0.1.xsd"));
    //     printFile("./src/generated/isdoc-invoice-6.0.1.ts");
    //     compile("./src/generated/isdoc-invoice-6.0.1.ts");
    // });
});
function printFile(fname) {
    var s = fs.readFileSync(fname).toString();
    console.log(s);
}
function compile(tsFile) {
    expect(compileAll([tsFile])).toBe(true);
}
function compileAll(tsFiles) {
    return _compile(tsFiles, {
        module: ts.ModuleKind.CommonJS,
        noEmitOnError: true,
        noImplicitAny: false,
        target: ts.ScriptTarget.ES5,
    });
}
function _compile(fileNames, options) {
    var program = ts.createProgram(fileNames, options);
    var emitResult = program.emit();
    var allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    allDiagnostics.forEach(function (diagnostic) {
        if (diagnostic.file) {
            var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
        }
        else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });
    var exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log("Compiling process exiting with code '" + exitCode + "'.");
    return !emitResult.emitSkipped;
}
//# sourceMappingURL=generator.spec.js.map