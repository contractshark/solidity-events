"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by eddy spreeuwers on 14-02-18.
 */
var fs = require("fs");
var ts = require("typescript");
var xsd_grammar_1 = require("../src/xsd-grammar");
var xmldom_reborn_1 = require("xmldom-reborn");
describe("grammar", function () {
    var simpleClassXsd = "";
    var simpleInheritedClassXsd = "";
    var importedClassXsd = "";
    var formXsd = "";
    var typesXsd = "";
    var groupXsd = "";
    var elmXsd = "";
    var simpleTypeXsd = "";
    var singleElmXsd = "";
    beforeEach(function () {
        simpleClassXsd = fs.readFileSync("./test/xsd/simpleClass.xsd").toString();
        simpleInheritedClassXsd = fs
            .readFileSync("./test/xsd/simpleInheritedClass.xsd")
            .toString();
        importedClassXsd = fs
            .readFileSync("./test/xsd/importedClass.xsd")
            .toString();
        formXsd = fs.readFileSync("./test/xsd/xep-004.xsd").toString();
        typesXsd = fs.readFileSync("./test/xsd/types.xsd").toString();
        groupXsd = fs.readFileSync("./test/xsd/group.xsd").toString();
        elmXsd = fs.readFileSync("./test/xsd/element.xsd").toString();
        singleElmXsd = fs.readFileSync("./test/xsd/singleElm.xsd").toString();
        simpleTypeXsd = fs.readFileSync("./test/xsd/simpletype.xsd").toString();
    });
    it(" can parse a single elements  ", function () {
        var ast = testGrammar(singleElmXsd);
        expect(ast.children.length).toBe(1);
        expect(ast.children[0].nodeType).toBe("AliasType");
        expect(ast.children[0].name).toBe("naam");
        expect(ast.children[0].attr.type).toBe("xs:string");
    });
    it(" can parse a simple class starting with Element ", function () {
        var ast = testGrammar(elmXsd);
        expect(ast.children.length).toBe(1);
        expect(ast.children[0].nodeType).toBe("Class");
        expect(ast.children[0].name).toBe("Classname");
        expect(ast.children[0].children).toBeDefined();
        expect(ast.children[0].children[0].nodeType).toBe("Field");
        expect(ast.children[0].children[0].attr.fieldName).toBe("intField");
        expect(ast.children[0].children[0].attr.fieldType).toBe("number");
    });
    it(" can parse a simple class starting with complexType", function () {
        var ast = testGrammar(simpleClassXsd);
        expect(ast.children.length).toBe(1);
        expect(ast.children[0].nodeType).toBe("Class");
        expect(ast.children[0].name).toBe("Test");
        expect(ast.children[0].children).toBeDefined();
        expect(ast.children[0].children[0].nodeType).toBe("Field");
        expect(ast.children[0].children[0].attr.fieldName).toBe("intField");
        expect(ast.children[0].children[0].attr.fieldType).toBe("number");
    });
    it(" can parse a simple class starting with an imported type namspace", function () {
        var ast = testGrammar(importedClassXsd);
        expect(ast.children.length).toBe(1);
        expect(ast.children[0].nodeType).toBe("Class");
        expect(ast.children[0].name).toBe("Test");
        expect(ast.children[0].children).toBeDefined();
        expect(ast.children[0].children[0].nodeType).toBe("Field");
        expect(ast.children[0].children[0].attr.fieldName).toBe("firstName");
        expect(ast.children[0].children[0].attr.fieldType).toBe("string");
        expect(ast.children[0].children[2].nodeType).toBe("Field");
        expect(ast.children[0].children[2].attr.fieldName).toBe("imported");
        expect(ast.children[0].children[2].attr.fieldType).toBe("dep.Node");
    });
    it(" can parse a simple simple Inherited Class", function () {
        var ast = testGrammar(simpleInheritedClassXsd);
        expect(ast.children.length).toBe(2);
        expect(ast.children[0].nodeType).toBe("Class");
        expect(ast.children[0].name).toBe("InheridedClass");
        expect(ast.children[0].children).toBeDefined();
        expect(ast.children[0].children[0].nodeType).toBe("Field");
        expect(ast.children[0].children[0].attr.fieldName).toBe("nestedFields");
        expect(ast.children[0].children[0].attr.fieldType).toBe("NestedFields");
        expect(ast.children[0].children[2].nodeType).toBe("Field");
        expect(ast.children[0].children[2].attr.fieldName).toBe("dateField");
        expect(ast.children[0].children[2].attr.fieldType).toBe("Date");
    });
    it(" can parse a simple enumeration  starting with element", function () {
        var ast = testGrammar(simpleTypeXsd);
        expect(ast.children[0].nodeType).toBe("AliasType");
        expect(ast.children[0].name).toBe("age");
        expect(ast.children[0].attr.type).toBe("number");
        expect(ast.children[1].nodeType).toBe("Enumeration");
        expect(ast.children[1].name).toBe("option");
        expect(ast.children[1].attr.values).toBeDefined();
        expect(ast.children[1].attr.values[0].attr.value).toBe("A");
        expect(ast.children[1].attr.values[1].attr.value).toBe("B");
    });
    it(" can parse a group tag", function () {
        var ast = testGrammar(groupXsd);
        expect(ast.children[0].nodeType).toBe("Group");
        expect(ast.children[0].name).toBe("custGroup");
        expect(ast.children[1].nodeType).toBe("Class");
        expect(ast.children[1].name).toBe("Ordertype");
        //expect(ast.children[0].type).toBe('group_custGroup');
    });
    it(" can parse an attribute group tag", function () {
        var ast = testGrammar(typesXsd);
        expect(ast.children[0].nodeType).toBe("Group");
        expect(ast.children[0].name).toBe("BaseView");
        expect(ast.children[1].nodeType).toBe("Class");
        expect(ast.children[1].name).toBe("View");
        //expect(ast.children[0].type).toBe('group_custGroup');
    });
});
function printFile(fname) {
    var s = fs.readFileSync(fname).toString();
    console.log(s);
}
function testGrammar(elmXsd) {
    var grammar = new xsd_grammar_1.XsdGrammar("Schema");
    console.log("src:", elmXsd);
    var xmlDom = new xmldom_reborn_1.DOMParser().parseFromString(elmXsd, "application/xml");
    var xmlNode = xmlDom.documentElement;
    var ast = grammar.parse(xmlNode);
    console.log("\n-----\nast:", JSON.stringify(ast || "", null, " "));
    expect(ast).toBeDefined();
    expect(ast.nodeType).toBe("schema");
    return ast;
}
function compile(tsFiles) {
    _compile(tsFiles, {
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
    console.log("Process exiting with code '" + exitCode + "'.");
    process.exit(exitCode);
}
//# sourceMappingURL=grammar.spec.js.map