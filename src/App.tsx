import TitleBar from "./components/TitleBar.tsx";
import FilmCategory from "./components/FilmCategory.tsx";
import NewCategory from "./components/NewCategory.tsx";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export default function App() {
  return (
    <>
      <Theme className="text-white text-base font-kannada leading-6 cursor-default">
        <TitleBar />
        <div className="overflow-y-auto h-[calc(100vh-32px)]">
          <FilmCategory />
          <NewCategory />
        </div>
      </Theme>
    </>
  );
}