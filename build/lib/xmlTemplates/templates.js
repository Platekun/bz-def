"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    single: '<xs:element name="{{name}}" type={{type}} />',
    list: '<xs:element name="{{name}}" type={{type}} minOccurs="0" maxOccurs="unbounded" />',
    io: "<?xml version=\"1.0\" encoding=\"utf-8\"?><xs:schema xmlns=\"http://tempuri.org/XMLSchema1.xsd\" xmlns:mstns=\"http://tempuri.org/XMLSchema1.xsd\" xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" id=\"XMLSchema1\" targetNamespace=\"http://tempuri.org/XMLSchema1.xsd\" elementFormDefault=\"qualified\"><xs:element name=\"{{...io}}s\" type=\"xs:complexType\"><xs:complexType><xs:sequence><xs:element name=\"{{...io}}\" type=\"xs:complexType\"><xs:complexType><xs:sequence>{{...ios}}</xs:sequence></xs:complexType></xs:element>{{...error?}}</xs:sequence></xs:complexType></xs:element></xs:schema>",
    error: "<xs:element name=\"error\" type=\"xs:complexType\"><xs:complexType><xs:sequence><xs:element name=\"error\" type=\"xs:string\" /><xs:element name=\"success\" type=\"xs:boolean\" /><xs:element name=\"status\" type=\"xs:integer\" /></xs:sequence></xs:complexType></xs:element>"
};
