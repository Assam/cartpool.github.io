/** @jsx React.DOM */
var React = require('react');
var {render} = require('react-dom');
var Modal = require('react-bootstrap/lib/Modal');
var actions = require('./../actions/productsActionCreator.js');

module.exports = React.createClass({
    getInitialState:function(){
        return {buyerName:''};
    },
    processOrder:function(){
        if(this.state.buyerName){
             actions.buy({
                    buyerName:this.state.buyerName,
                    product:this.props.product,
                    soldPrice:this.props.product.currentPrice
                }); 
            this.setState({buyerName:""});
        }
    },
    onBuyerNameChange:function(e){
        this.setState({buyerName:e.target.value});
    },
    render: function(){
        return(
          <Modal show={this.props.show} onHide={this.processOrder} container={this} aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Buy Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label  class="col-sm-2 control-label"
                              for="inputBN">Buyer Name</label>
                    <div class="col-sm-10">
                        <input type="text" ref="buyerInput" class="form-control" 
                        id="inputBN" placeholder="Buyer Name" value={this.state.buyerName} onChange={this.onBuyerNameChange} />
                    </div>
                  </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-success" onClick={this.processOrder} disabled={!this.state.buyerName}>Process</button>
          </Modal.Footer>
        </Modal>
        )
    }
});