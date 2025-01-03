function fn(){
    // TS1002
    const text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr
  
    // TS1005
    type Person {
      age: number;
      name: string;
    }
  
    // TS1015 参数不能同时有问号和初始化符
    function getName(firstName: string, lastName?: string = 'Doe'): string {
      return `${firstName} ${lastName}`;
    }
    getName("1")
  
    // TS1016 必须参数不能位于可选参数之后
    function createUser(middleName?: string, age: number) {
      // ...
    }
  
    // TS1064 异步函数或方法的返回类型必须全是全局Promise类型
    async function myFunction(): string {
      return 'test';
    }
  }
  
  fn()
  
  