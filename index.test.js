const pxToRem = require("./index");
const babel = require("babel-core");

var input = "var styles = css`font-size: 17px`;";
var expected = "var styles = css`font-size: 1.0625rem`;";

it("converts pixels to rems", () => {
    const { code } = babel.transform(input, { plugins: [pxToRem] });
    expect(code).toBe(expected);
});
