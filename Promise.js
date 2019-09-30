
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
    return this;
  }
  resolve(res) {
    this.status = statusMap.RESOLVED;
    this.result = res;
    this.resList.forEach(item =>{
      if (typeof item !== 'function') {
        console.log('callback should be a Function');
      } else {
        const result = item(this.result);
        this.result = result;
      }
    });
  }
  reject(res) {
    this.status = statusMap.REJECTED;
    this.result = res;
    this.rejList.forEach(item => typeof item === 'function' && item(res)); 
  }
}

let p = new MyPromise((resolve, reject) => {
  setTimeout(()=>{
    console.log('promise init');
    resolve('init result');
  },1000)
});

p.then((res)=>{
  console.log('1 初始化结果:' + res);
  return 'new result';
}).then((res)=> {
  console.log('2 链式调用后的结果:' + res);
  return 'result3';
})

p.then((res)=>{
  console.log('3 第三次调用的结果:' + res);
})