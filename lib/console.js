"use strict";

exports.__esModule = true;
exports.default = wrapInConsole;
function wrapInConsole(code) {
  return "return React.createClass({\n        getInitialState(){ return { log: [] }},\n\n        componentDidMount(){\n          var console = {\n            log: (...args) => this.setState(state => ({log: state.log.concat(format(...args))}) )\n          };\n\n          ;(function(){\n            " + code + "\n          })()\n        },\n\n        render() {\n          return (\n            <div style={{padding: 15}}>\n              {this.state.log.map((x, idx) => {\n                return (\n                  <div key={idx}\n                    style={{\n                      borderBottom: \"1px solid #ccc\",\n                      padding: \"4px 0\"\n                    }}>\n                    {x}\n                  </div>\n                );\n              })}\n            </div>\n          )\n        }\n      });";
}
module.exports = exports['default'];