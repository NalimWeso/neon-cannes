import { useRef } from 'react';
import TitleBar from "./components/TitleBar";
import FilmsDashboard from "./components/FilmsDashboard";
import NewCategory from "./components/NewCategory";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 120);
  };

  return (
    <>
      <Theme className="text-white text-base font-kannada leading-6 cursor-default">
        <TitleBar />
        <div ref={scrollRef} className="overflow-y-auto h-[calc(100vh-32px)]">
          <FilmsDashboard />
          <NewCategory onSave={scrollToBottom} />
        </div>
      </Theme>
    </>
  );
}