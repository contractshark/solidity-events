"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classGenerator_1 = require("../src/classGenerator");
var xml_utils_1 = require("../src/xml-utils");
var fs = require("fs");
var logClassDef = function (result) {
    xml_utils_1.log("\n----- classdef --------\n");
    xml_utils_1.log(result.write());
    xml_utils_1.log("\n-----------------------\n");
    result.classes.forEach(function (c) {
        xml_utils_1.log(c.name);
    });
    console.log("\n-------------\n");
};
describe("ClassGenerator", function () {
    var generator;
    var simpleClassXsd = "";
    var simpleInheritedClassXsd = "";
    var importedClassXsd = "";
    var formXsd = "";
    var typesXsd = "";
    var groupXsd = "";
    var elmXsd = "";
    var choiceXsd = "";
    var simpleTypeXsd = "";
    var singleElmXsd = "";
    beforeEach(function () {
        generator = new classGenerator_1.ClassGenerator({ dep: "xml-parser" });
        simpleClassXsd = fs.readFileSync("./test/xsd/simpleClass.xsd").toString();
        simpleInheritedClassXsd = fs
            .readFileSync("./test/xsd/simpleInheritedClass.xsd")
            .toString();
        importedClassXsd = fs
            .readFileSync("./test/xsd/importedClass.xsd")
            .toString();
        formXsd = fs.readFileSync("./test/xsd/xep-004.xsd").toString();
        choiceXsd = fs.readFileSync("./test/xsd/choice.xsd").toString();
        typesXsd = fs.readFileSync("./test/xsd/types.xsd").toString();
        groupXsd = fs.readFileSync("./test/xsd/group.xsd").toString();
        elmXsd = fs.readFileSync("./test/xsd/element.xsd").toString();
        singleElmXsd = fs.readFileSync("./test/xsd/singleElm.xsd").toString();
        simpleTypeXsd = fs.readFileSync("./test/xsd/simpletype.xsd").toString();
    });
    it("heeft een werkende constructor", function () {
        expect(generator).toBeDefined();
    });
    it("heeft een generateClassFileDefition methode", function () {
        expect(generator.generateClassFileDefinition).toBeDefined();
    });
    it("heeft een types property", function () {
        expect(generator.types).toBeDefined();
    });
    it("returns an empty claas array for an empty string", function () {
        expect(generator.generateClassFileDefinition("").classes.length).toBe(0);
    });
    it("returns a simple classFile ", function () {
        var result = generator.generateClassFileDefinition(simpleClassXsd);
        logClassDef(result);
        expect(result.classes.length).toBe(3);
    });
    it("geeft een inherited classFile terug", function () {
        var result = generator.generateClassFileDefinition(simpleInheritedClassXsd, "", true);
        logClassDef(result);
        expect(result.classes.length).toBe(6);
        var test = result.getClass("InheridedClass");
        xml_utils_1.log(test.write());
        expect(test).toBeDefined();
        expect(test.extendsTypes[0].text).toBe("Base");
        expect(test.getProperty("intField")).toBeDefined();
        expect(test.getProperty("dateField")).toBeDefined();
        expect(test.getMethod("constructor")).toBeDefined();
        expect(test.getProperty("dateField").type.isArrayType()).toBe(false);
        expect(test.getProperty("arrayField?").type.isArrayType()).toBe(true);
        expect(test.getProperty("nestedFields").type.isArrayType()).toBe(false);
        expect(test.getProperty("nestedFields").type.text).toBe("NestedFields");
        expect(test.getProperty("strArrayField").type.text).toBe("string[]");
    });
    // it("geeft een  classFile terug met imports", () => {
    //     let importingClass =generator.generateClassFileDefinition(importedClassXsd, '' , true);
    //     expect(importingClass.classes.length).toBe(1);
    //     let fld = importingClass.getClass("Test").getProperty("imported");
    //     expect(fld).toBeDefined();
    // });
    //
    // it("geeft een  classFile terug voor form met refs", () => {
    //     const classFile = generator.generateClassFileDefinition(formXsd, "", true);
    //
    //     console.log(classFile.write());
    //     expect(classFile.classes.length).toBe(6);
    //     let fld = classFile.getClass("X").getProperty("field?");
    //     expect(fld.type.text).toBe("Field[]");
    //     expect(fld.name).toBe("field?");
    //
    //     fld = classFile.getClass("Field").getProperty("option?");
    //     expect(fld.type.text).toBe("Option[]");
    //     expect(fld.name).toBe("option?");
    //
    // });
    it("geeft een  classFile terug voor form met refs", function () {
        var classFile = generator.generateClassFileDefinition(formXsd, "", true);
        xml_utils_1.log(classFile.write());
        var classNames = ["X", "Field", "Option", "ForValue", "Item", "Reported"];
        expect(classFile.classes.length).toBe(classNames.length);
        var fld = classFile.getClass("X").getProperty("field?");
        expect(fld.type.text).toBe("Field[]");
        expect(fld.name).toBe("field?");
        fld = classFile.getClass("Field").getProperty("option?");
        expect(fld.type.text).toBe("Option[]");
        expect(fld.name).toBe("option?");
    });
    it("geeft een  classFile terug voor een enkel leeg element", function () {
        var classFile = generator.generateClassFileDefinition(singleElmXsd, "", true);
        console.log(classFile.write());
        expect(classFile.classes.length).toBe(1);
        var c = classFile.getClass("Naam");
        expect(c).toBeDefined();
    });
    it("returns a classFile for a groupXsd", function () {
        var classFile = generator.generateClassFileDefinition(groupXsd, "", true);
        console.log(classFile.write());
        expect(classFile.classes.length).toBe(3);
        var c = classFile.getClass("Ordertype");
        console.log("class:  ", c.write());
        expect(c).toBeDefined();
        expect(c.extendsTypes.length).toBe(1);
        var superClass = c.extendsTypes[0].text;
        expect(superClass).toBe("CustGroup");
        c = classFile.getClass(superClass);
        var p = c.getProperty("customer");
        expect(p.type).toBeDefined();
    });
    it("returns a classFile for a single element with nested type", function () {
        var classFile = generator.generateClassFileDefinition(elmXsd, "", true);
        console.log(classFile.write());
        expect(classFile.classes.length).toBe(2);
        var c = classFile.getClass("Naam");
        expect(c).toBeDefined();
    });
    it("returns a classFile for a simpleTypeXsd", function () {
        var classFile = generator.generateClassFileDefinition(simpleClassXsd, "", true);
        var types = generator.types.map(function (t) { return "" + t; }).join("\n");
        xml_utils_1.log("-------------------------------------\n");
        xml_utils_1.log(types, "\n\n", classFile.write());
        expect(classFile.classes.length).toBe(3);
        var c = classFile.getClass("Schema");
        expect(c.name).toBe("Schema");
    });
    it("returns a classFile for a simpleTypeXsd", function () {
        var classFile = generator.generateClassFileDefinition(simpleTypeXsd, "", true);
        xml_utils_1.log("------------ classes -------------------------\n");
        xml_utils_1.log(classFile.write());
        expect(classFile.classes.length).toBe(1);
        var c = classFile.getClass("Schema");
        expect(c.name).toBe("Schema");
    });
    it("returns a  classFile with special types from typesXsd", function () {
        var _a, _b;
        var classFile = generator.generateClassFileDefinition(typesXsd, "", true);
        console.log("-------------------------------------\n");
        console.log(classFile.write());
        expect(classFile.classes.length).toBe(7);
        var method = (_a = classFile.getClass("Module")) === null || _a === void 0 ? void 0 : _a.getMethod("param");
        expect((_b = method === null || method === void 0 ? void 0 : method.returnType) === null || _b === void 0 ? void 0 : _b.text).toBe("void");
    });
    it("returns a  classFile with special types from typesXsd", function () {
        var _a, _b;
        var classFile = generator.generateClassFileDefinition(choiceXsd, "", true);
        console.log("-------------------------------------\n");
        console.log(classFile.write());
        expect(classFile.classes.length).toBe(2);
        var method = (_a = classFile.getClass("Choose")) === null || _a === void 0 ? void 0 : _a.getMethod("item");
        expect((_b = method === null || method === void 0 ? void 0 : method.returnType) === null || _b === void 0 ? void 0 : _b.text).toBe("void");
    });
});
//# sourceMappingURL=classGenerator.spec.js.map