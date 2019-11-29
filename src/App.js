import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './conteiners/Quiz/Quiz';


// здесь рендерим нужную страницу

function App() {
  return (
    <Layout>
      <Quiz />
      
    </Layout>
  );
}

export default App;
