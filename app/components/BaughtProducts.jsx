/** @jsx React.DOM */
var React = require('react');
var {render} = require('react-dom');
var Modal = require('react-bootstrap/lib/Modal');
var actions = require('./../actions/productsActionCreator.js');

module.exports=React.createClass({
    closeModal: function(){
        actions.completebuy(this.props.buyer); 
    },
    render: function(){
        var modalBody = '';
        if(this.props.buyer){
            modalBody = (<div><h4>{this.props.buyer.name}</h4>
            <ul>
            {this.props.buyer.baughtProducts.map(function(baughtProduct,index){
                return(
                        <li>{baughtProduct.product.title} AED {baughtProduct.price}</li>
                      )
            })}
            </ul></div>);
        }
        return(
          <Modal show={this.props.show} onHide={this.closeModal} container={this} aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Baught Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                                 {modalBody}
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-success" onClick={this.closeModal}>Close</button>
          </Modal.Footer>
        </Modal>
        )
    }
});