const proxy = [
    {
      context: '/api',
      target: 'http://mapforum.in4.com.br',
      pathRewrite: {'^/api' : ''}
    }
  ];
  
  export default proxy;