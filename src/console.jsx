
export default function wrapInConsole(code) {
  return (
    `return React.createClass({
        getInitialState(){ return { log: [] }},

        componentDidMount(){
          var console = {
            log: (...args) => this.setState(state => ({log: state.log.concat(format(...args))}) )
          };

          ;(function(){
            ${code}
          })()
        },

        render() {
          return (
            <div style={{padding: 15}}>
              {this.state.log.map((x, idx) => {
                return (
                  <div key={idx}
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "4px 0"
                    }}>
                    {x}
                  </div>
                );
              })}
            </div>
          )
        }
      });`
  )
}
