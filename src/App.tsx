import CurrentFilms from "./components/CurrentFilms.tsx";
import FutureFilms from "./components/FutureFilms.tsx";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

function App() {
  return (
    <>
      <Theme className="text-white text-base font-kannada cursor-default">
        <CurrentFilms />
        <FutureFilms />
      </Theme>
    </>
  );
}

export default App;