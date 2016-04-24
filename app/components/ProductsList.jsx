var React = require('react');
var Product = require('./Product.jsx');
var BuyProduct = require('./BuyProduct.jsx');
var BaughtProducts = require('./BaughtProducts.jsx');
module.exports = React.createClass({
    render: function(){
        var showPopup = false;
        if(this.props.selectedProduct){
            showPopup=true;
        }
        var showBaughtPopup=false;
         if(this.props.LastBuyer){
            showBaughtPopup=true;
        }
        return (
            <div className="cp-products">
                <BuyProduct show={showPopup} product={this.props.selectedProduct}/>
                <BaughtProducts show={showBaughtPopup} buyer={this.props.LastBuyer}/>
                <div className="row">
                    {this.props.Products.map(function(item,index){
                        return (
                            <div>
                                <Product item={item} key={index} />
                            </div>
                        )
                    })                       
                    }
                </div>
            </div>
        )
    }
})