import Button from '~/components/global/Button/Button';
import Select from '~/components/global/Select/Select';
import Input from '~/components/global/Input/Input';
import { useState } from 'react';


function HomeContainer() {
  const [selection, setSelection] = useState<string>('0');

  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-5">Explore the Metaverse</h1>
      <form className="flex home-search-form">
        <Select 
        defaultValue={selection}
        onChange={(e) => setSelection(e.value != '0' ? e.value : selection)}
        options={[
          {text: 'Choose Platform:', value:'0'},
          {text: 'Decentraland', value:'1'},
          {text: 'The Sandbox', value:'2'}
        ]}></Select>
        <Button className="mr-5">Search Land</Button>
        <Button>Search Experiences</Button>
      </form>
    </div>
  );
}

export default HomeContainer;
