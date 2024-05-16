import { RocketIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

export default function NewCategory() {
    return (
        <div className="ml-1 pt-6 pb-2">
            <Button size="1" color="orange" variant="soft" className="text-amber-500 text-sm font-bold px-3 py-3.5 rounded transition cursor-pointer">
                New Category<RocketIcon className='ml-1' />
            </Button>
        </div>
    )
}