// Thanks to: https://github.com/cuth/postcss-pxtorem/blob/master/lib/pixel-unit-regex.js#L9
var pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/g;

function replace(match, p1) {
    return p1 / 16 + "rem";
}

function PxToRem(babel) {
    return {
        name: "px-to-rem",
        visitor: {
            TaggedTemplateExpression(path) {
                if (path.node.tag.name !== "css") {
                    return;
                }

                var cooked = path.node.quasi.quasis[0].value.cooked;
                path.node.quasi.quasis[0].value.raw = cooked.replace(
                    pxRegex,
                    replace
                );
            }
        }
    };
}

module.exports = PxToRem;
