var dispatcher = require('./../dispatcher.js');
var fileDownloader = require("downloadjs");
function ProductsStore() {
    var Products = [
        {
            'id':1,
            'title': 'iPhone 32 GB',
            'description': 'best thing ever, thanks steves',
            'maxPrice': 1000,
            'minPrice':600,
            'inPool':false
        },
        {
            'id':2,
            'title': 'iPhone 64 GB',
            'description': 'best thing ever, thanks steves',
            'maxPrice': 2000,
            'minPrice':1600,
            'inPool':false
        },
        {
            'id':3,
            'title': 'Samsung S4',
            'description': 'only for testing, why google?',
            'maxPrice': 1600,
            'minPrice': 1200,
            'inPool':false
        },
        {
            'id':4,
            'title': 'Samsung S5',
            'description': 'i repeat only for testing, why google?',
            'maxPrice': 3000,
            'minPrice': 2500,
            'inPool':false
        }
];
    var buyers = [];
    var listeners=[];
    var _succPoolCount = 5;
    var _selectedProduct = '';
    var _randomProductCache='';
    var _timerLimit=120;// 2 minutes
    var _noOfPools = 3;
    var _lastBuyer = '';
    
    function _getRandomProducts(count){
     var result = new Array(count),
        len = Products.length,
        taken = new Array(len);
    if (count > len)
        throw new RangeError("getRandomProducts: more elements taken than available");
    while (count--) {
        var x = Math.floor(Math.random() * len);
        result[count] = Products[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
};

    function _buyProduct(args){
    var _item = _randomProductCache.filter(function(a){ 
        return a.id === args.product.id;
    })[0];
    var buyer = buyers.filter(function(buyer){
        return buyer.name===args.buyerName;
    })[0];
        var newBuyer=false;
    if(!buyer){
        buyer = {'name':args.buyerName,baughtProducts:[]}; 
         newBuyer=true;
    }
    buyer.baughtProducts.push({product:_item,price:args.soldPrice});
        if(newBuyer)
           buyers.push(buyer);
        _lastBuyer=buyer;
    soldCount = _getProductOrderCount(_item.id);
    _selectedProduct='';
    _triggerListeners();   
    if(soldCount>=_succPoolCount){
        _unlockPrice(soldCount,_item)
        _resetTimer(_item);
        _item.intervalId = setInterval(_tick, 1000, _item);
    }
};
    function _getProductOrderCount(productid){
        var soldCount = 0;
        buyers.forEach(function(buyer){
        var buyerProducts = buyer.baughtProducts.filter(function(baughtProduct){
          return baughtProduct.product.id===productid;})[0];
        if(buyerProducts)
           soldCount++;
        });
        return soldCount;
    }
    
    function _unlockPrice(buyers,item){
        var unlockPool = item.pools.filter(function(pool){
            if(pool.buyers === buyers && pool.unLocked === false){
                return pool;
            }
        })[0];
        if(unlockPool){
            unlockPool.unLocked = true;
            item.currentPrice = unlockPool.unLockPrice;
        }
    }
    function _triggerListeners(){
        var state = _getState();
		  listeners.forEach(function(listener){
			listener(state);
		})
	};
    
    function _onChange(listener){
        listeners.push(listener);
    }
    
    function _addToCart(product){
        _selectedProduct = product;
        _triggerListeners();
    }
    
    dispatcher.register(function(event){
        var split = event.type.split(':');
        if (split[0]==='cp-product'){
            switch(split[1]){
                case "addtocart":
                    _addToCart(event.payload);
                    break;
                 case "buy":
                    _buyProduct(event.payload);
                    break;
                case "completebuy":
                    _lastBuyer='';
                    _triggerListeners();
                    break;
            }
        }
    });
    function _tick(product){
        product.timerValue = product.timerValue + 1;
        if(product.timerValue === _timerLimit){
            fileDownloader(JSON.stringify(buyers), "buyers.txt", "text/plain");
           _resetTimer(product);
            buyers='';
            _randomProductCache='';
        }
        _triggerListeners();
    }
    
    function _resetTimer(product){
        clearInterval(product.intervalId);
        product.intervalId = '';
        product.timerValue = 0;
    }
    
    function _getState(){
        if(!_randomProductCache){
            _randomProductCache = _getRandomProducts(2);
            _randomProductCache.forEach(function(product){
                product.inPool = false;
                product.timerValue = 0;
                product.currentPrice = product.maxPrice;
                product.pools=_getPools(product);
            });
        }
        return {Products:_randomProductCache,SelectedProduct:_selectedProduct,LastBuyer:_lastBuyer};
    }
    
    function _getPools(Product){
        var margin = Product.maxPrice - Product.minPrice;
        var poolUnlockValue = margin/_noOfPools;
        var Pools = [];
        for(var i = 1; i <= _noOfPools; i++){
            Pools.push({'buyers': i*_succPoolCount,
                        'unLockPrice':Math.round(Product.maxPrice-(poolUnlockValue*i)),
                        'unLocked':false
                       });
        }
        return Pools;
    }
    
    return {
        State:_getState(),
        onChange:_onChange
    };
}


module.exports = new ProductsStore();