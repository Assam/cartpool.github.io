
/** @jsx React.DOM */

var React = require('react');
var {render} = require('react-dom');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;
(window !== window.top ? window.top : window).ReactDOM = render;

var ProductsList = require('./components/ProductsList.jsx');

var ProductsStore = require('./stores/ProductsStore.jsx');
var _state = ProductsStore.State;
function renderUI(){
    render(
        <div>
        <ProductsList Products={_state.Products} selectedProduct={_state.SelectedProduct} LastBuyer={_state.LastBuyer}/>
        </div>
        ,app)
}
ProductsStore.onChange(function(state){
        _state = state;
        renderUI();
    })            
renderUI();