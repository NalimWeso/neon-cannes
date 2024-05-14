import CurrentFilms from "./components/CurrentFilms.tsx";
import FutureFilms from "./components/FutureFilms.tsx";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

function App() {
  return (
    <>
      <Theme className="text-white font-kannada">
        <CurrentFilms />
        <FutureFilms />
      </Theme>
    </>
  );
}

export default App;