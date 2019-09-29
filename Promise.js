
const statusMap = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}
class MyPromise { 
  constructor(callback) {
    this.result = '';
    this.status = statusMap.PENDING;
    this.resList = [];
    this.rejList = [];
    typeof callback === 'function' && callback(this.resolve.bind(this), this.reject.bind(this));
  }
  then(callback) {
    if (this.status === statusMap.RESOLVED) {
      typeof callback === 'function' && callback(this.result);
    } else {
      this.resList.push(callback);
    }
  }
  resolve(res) {
    this.status = statusMap.RESOLVED;
    this.result = res;
    this.resList.forEach(item => typeof item === 'function' && item(res)); 
  }
  reject(res) {
    this.status = statusMap.REJECTED;
    this.result = res;
    this.rejList.forEach(item => typeof item === 'function' && item(res)); 
  }
}

let p = new MyPromise((resolve, reject) => {
  setTimeout(()=>{
    console.log('promise3 init');
    resolve('this is result p');
  },1000)
});

p.then((res)=>{
  console.log('promise3 run :' + res);
})