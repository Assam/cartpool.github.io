var dispatcher = require('./../dispatcher.js');

module.exports = {
    buy:function(item){
        dispatcher.dispatch({
            payload:item,
            type:"cp-product:buy"
        })
    },
    addtocart:function(item){
        dispatcher.dispatch({
            payload:item,
            type:"cp-product:addtocart"
        })
    },
    completebuy:function(item){
        dispatcher.dispatch({
            payload:item,
            type:"cp-product:completebuy"
        })
    }
}