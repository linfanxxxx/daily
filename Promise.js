let p1 = new Promise((resolve, reject) => {
  setTimeout(()=> {
    console.log('p1 run');
    resolve('p1 result');
  },1000);
});


p1.then(res=>{
  console.log(res);
});

const statusMap = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

function MyPromise(callback) {
  this.status = statusMap.PENDING;
  this.result = '';
  let resolveCbList = [];
  let rejectCbList = [];
  this.resolveCbList = resolveCbList;
  this.rejectCbList = rejectCbList;
  let resolve = function (res) {
    status = statusMap.RESOLVED;
    result = res;
    resolveCbList.forEach(cb => {
      typeof cb === 'function' && cb(this.result);
    })
  }
  let rejected = function (err) {
    status = statusMap.REJECTED;
    result = err;
    rejectCbList.forEach(cb => {
      typeof cb === 'function' && cb(this.result);
    })
  }

  callback(resolve, rejected);

  // if(status === statusMap.RESOLVED) {
  //   typeof callback === 'function' && callback(result);
  // }
  // if(status === statusMap.REJECTED) {
  //   typeof callback === 'function' && callback(result);
  // }
}

MyPromise.prototype.then = function(callback) {
  if(this.status === statusMap.RESOLVED) {
    typeof callback === 'function' && callback(this.result);
  } else {
    console.log('myPromise then', callback);
    this.resolveCbList.push(callback);
    console.log('resolveCbList', this.resolveCbList);
  }
}

let p2 = new MyPromise((resolve, reject) => {
  setTimeout(()=> {
    console.log('p2 run');
    resolve('p2 result');
  },1000);
});


p2.then(res=>{
  console.log(res);
});