var pxRegex = /(\d*\.?\d+)px/g;

function replacePx(match, p1) {
    return (p1 / 16).toString() + "rem";
}

function transform(quasis) {
    ["cooked", "raw"].forEach(function(type) {
        quasis.forEach(function(element, i) {
            element.value[type] = element.value[type].replace(
                pxRegex,
                replacePx
            );
        });
    });
}

// To log on errors, use DEBUG=babel:* when running via node
function PxToRem(babel) {
    return {
        name: "px-to-rem",
        visitor: {
            TaggedTemplateExpression(path) {
                if (path.node.tag.name !== "css") {
                    return;
                }

                var quasis = path.node.quasi.quasis;
                transform(quasis);
            }
        }
    };
}

module.exports = PxToRem;
