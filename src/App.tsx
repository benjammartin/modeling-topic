import Tabs from './example-one/tabs';
import Slice from './components/slice';
import Demo from './components/demo-wrapper';
import Field from './components/field';

function App() {
  return (
    <>
      <Demo>
        <Slice>
          <Field />
          <Field />
          <Tabs />
        </Slice>
      </Demo>
    </>
  );
}

export default App;
