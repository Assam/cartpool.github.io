/** @jsx React.DOM */
var React = require('react');
var actions = require('./../actions/productsActionCreator.js');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');
module.exports = React.createClass({
    
    buyProduct:function(){
       console.log("Successfully baught");
        actions.addtocart(this.props.item);
    },
    render:function(){
        var timerTag = '';
        if(this.props.item.timerValue>0){
            timerTag = <button className="btn btn-primary" type="button">
  PoolTimer <span className="badge">{this.props.item.timerValue}</span>
</button>;
        }
        return (
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading clearfix">
                                <h4 className="panel-title">{this.props.item.title}</h4>
                                <div className="pull-right">{timerTag}</div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-12">
                                         <ul>
                                            <li>Title: {this.props.item.title}</li>
                                            <li>Description: {this.props.item.description}</li>
                                            <li>Price: AED {this.props.item.maxPrice}</li>
                                            <li>UnlockedPrice: AED {this.props.item.currentPrice}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 pull-right">
                                         <button type="button" className="btn btn-success pull-right" onClick={this.buyProduct}> Buy</button>
                                    </div>
                                </div>
                                  <div className="row">
                                    <div className="col-md-12">
                                        
                                    </div>
                                </div>
                        </div>
                        <div className="panel-footer">
                            <ProgressBar className="cp-progressbar">
                                {this.props.item.pools.map(function(pool,index){
                                var concatValue = pool.buyers+' buyers =  '+pool.unLockPrice;
                                var pbNowValue=[30,30,40]
                                var pbStyles = ['danger','success'];
                                return (
                                    <ProgressBar bsStyle={pbStyles[index]} now={pbNowValue[index]} key={index} label={concatValue}/>);
                                })}
                        </ProgressBar>
                        </div>
                    </div>
                </div>
            </div>
 </div>
        )
    }
})