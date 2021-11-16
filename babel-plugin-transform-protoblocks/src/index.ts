import { types as t } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";
import { Visitor } from "@babel/traverse";

const PROTOCOL_IDENTIFIER = "__PROTOBLOCKS_PROTOCOL__";
const PROTOCOL_IMPORT = t.variableDeclaration("const", [
  t.variableDeclarator(
    t.objectPattern([
      t.objectProperty(
        t.identifier("Protocol"),
        t.identifier(PROTOCOL_IDENTIFIER)
      ),
    ]),
    t.callExpression(t.identifier("require"), [t.stringLiteral("protoblocks")])
  ),
]);

export default declare((api) => {
  api.assertVersion(7);

  return {
    name: "transform-protoblocks",
    visitor: {
      ProtocolDeclaration(path) {
        const { node } = path;

        path.replaceWithMultiple([
          PROTOCOL_IMPORT,
          t.variableDeclaration("const", [
            t.variableDeclarator(
              node.id,
              t.newExpression(t.identifier(PROTOCOL_IDENTIFIER), [
                t.objectExpression([
                  t.objectProperty(
                    t.identifier("name"),
                    t.stringLiteral(node.id.name)
                  ),
                  t.objectProperty(
                    t.identifier("principals"),
                    t.arrayExpression(
                      node.principals.map((principalNode) =>
                        t.objectExpression([
                          t.objectProperty(
                            t.identifier("name"),
                            t.stringLiteral(principalNode.id.name)
                          ),
                          t.objectProperty(
                            t.identifier("inputs"),
                            t.arrayExpression(
                              principalNode.inputs.map((inputId) =>
                                t.stringLiteral(inputId.name)
                              )
                            )
                          ),
                        ])
                      )
                    )
                  ),
                  t.objectProperty(
                    t.identifier("steps"),
                    t.arrayExpression(
                      node.body.steps.map((stepNode) =>
                        t.objectExpression([
                          t.objectProperty(
                            t.identifier("origin"),
                            t.stringLiteral(stepNode.parties[0].name)
                          ),
                          t.objectProperty(
                            t.identifier("recipients"),
                            t.arrayExpression(
                              stepNode.parties
                                .slice(1)
                                .map((party) => t.stringLiteral(party.name))
                            )
                          ),
                          t.objectProperty(
                            t.identifier("name"),
                            t.stringLiteral(stepNode.id.name)
                          ),
                          t.objectProperty(
                            t.identifier("function"),
                            t.arrowFunctionExpression(
                              stepNode.parties,
                              stepNode.body,
                              true
                            )
                          ),
                        ])
                      )
                    )
                  ),
                ]),
              ])
            ),
          ]),
        ]);
      },
    } as Visitor<any>,
  };
});
