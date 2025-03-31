import { Button } from '../components/button';
import { Checkbox } from '../components/checkbox';
import { Input } from '../components/input';

export function ComponentTestFrame() {
  return (
    <>
      <h1 className="ml-10 mt-10 text-title-1">Typography</h1>
      <div className="m-10">
        <div className="flex mb-2">
          <div className="w-[200px] mr-4 text-title-1">Title 1</div>
          <div className="w-[120px] mr-4 text-title-1">22px</div>
          <div className="w-[120px] mr-4 text-title-1">700</div>
          <div className="w-[120px] text-title-1">150%</div>
        </div>
        <div className="flex mb-2">
          <div className="w-[200px] mr-4 text-title-2">Title 2</div>
          <div className="w-[120px] mr-4 text-title-2">18px</div>
          <div className="w-[120px] mr-4 text-title-2">600</div>
          <div className="w-[120px] text-title-2">150%</div>
        </div>
        <div className="flex mb-2">
          <div className="w-[200px] mr-4 text-title-3">Title 3</div>
          <div className="w-[120px] mr-4 text-title-3">16px</div>
          <div className="w-[120px] mr-4 text-title-3">600</div>
          <div className="w-[120px] text-title-3">150%</div>
        </div>
        <div className="flex mb-2">
          <div className="w-[200px] mr-4 text-body-1">Body 1</div>
          <div className="w-[120px] mr-4 text-body-1">16px</div>
          <div className="w-[120px] mr-4 text-body-1">400</div>
          <div className="w-[120px] text-body-1">150%</div>
        </div>
        <div className="flex mb-2">
          <div className="w-[200px] mr-4 text-body-2">Body 2</div>
          <div className="w-[120px] mr-4 text-body-2">14px</div>
          <div className="w-[120px] mr-4 text-body-2">400</div>
          <div className="w-[120px] text-body-2">140%</div>
        </div>
        <div className="flex mb-2">
          <div className="w-[200px] mr-4 text-label-1">Label 1</div>
          <div className="w-[120px] mr-4 text-label-1">14px</div>
          <div className="w-[120px] mr-4 text-label-1">400</div>
          <div className="w-[120px] text-label-1">120%</div>
        </div>
        <div className="flex mb-2">
          <div className="w-[200px] mr-4 text-label-2">Label 2</div>
          <div className="w-[120px] mr-4 text-label-2">12px</div>
          <div className="w-[120px] mr-4 text-label-2">400</div>
          <div className="w-[120px] text-label-2">120%</div>
        </div>
      </div>
      <hr className="border-neutral-100" />

      <h1 className="ml-10 mt-10 text-title-1">Color Palette</h1>
      <div className="m-10">
        <div className="text-title-2 mb-5">Primary</div>
        <div className="w-[1280px] h-20 mb-5 gap-2 grid grid-cols-11 grid-rows-1">
          <div className="bg-primary-50 rounded-[8px]"></div>
          <div className="bg-primary-100 rounded-[8px]"></div>
          <div className="bg-primary-200 rounded-[8px]"></div>
          <div className="bg-primary-300 rounded-[8px]"></div>
          <div className="bg-primary-400 rounded-[8px]"></div>
          <div className="bg-primary-500 rounded-[8px]"></div>
          <div className="bg-primary-600 rounded-[8px]"></div>
          <div className="bg-primary-700 rounded-[8px]"></div>
          <div className="bg-primary-800 rounded-[8px]"></div>
          <div className="bg-primary-900 rounded-[8px]"></div>
          <div className="bg-primary-950 rounded-[8px]"></div>
        </div>

        <div className="text-title-2 mb-5">Red</div>
        <div className="w-[1280px] h-20 mb-5 gap-2 grid grid-cols-11 grid-rows-1">
          <div className="bg-red-50 rounded-[8px]"></div>
          <div className="bg-red-100 rounded-[8px]"></div>
          <div className="bg-red-200 rounded-[8px]"></div>
          <div className="bg-red-300 rounded-[8px]"></div>
          <div className="bg-red-400 rounded-[8px]"></div>
          <div className="bg-red-500 rounded-[8px]"></div>
          <div className="bg-red-600 rounded-[8px]"></div>
          <div className="bg-red-700 rounded-[8px]"></div>
          <div className="bg-red-800 rounded-[8px]"></div>
          <div className="bg-red-900 rounded-[8px]"></div>
          <div className="bg-red-950 rounded-[8px]"></div>
        </div>

        <div className="text-title-2 mb-5">Neutral</div>
        <div className="w-[1280px] h-20 mb-5 gap-2 grid grid-cols-11 grid-rows-1">
          <div className="bg-neutral-50 rounded-[8px]"></div>
          <div className="bg-neutral-100 rounded-[8px]"></div>
          <div className="bg-neutral-200 rounded-[8px]"></div>
          <div className="bg-neutral-300 rounded-[8px]"></div>
          <div className="bg-neutral-400 rounded-[8px]"></div>
          <div className="bg-neutral-500 rounded-[8px]"></div>
          <div className="bg-neutral-600 rounded-[8px]"></div>
          <div className="bg-neutral-700 rounded-[8px]"></div>
          <div className="bg-neutral-800 rounded-[8px]"></div>
          <div className="bg-neutral-900 rounded-[8px]"></div>
          <div className="bg-neutral-950 rounded-[8px]"></div>
        </div>
      </div>
      <hr className="border-neutral-100" />

      <h1 className="ml-10 mt-10 text-title-1">Button Component</h1>
      <div className="w-[700px] m-10 gap-5 grid grid-cols-4 grid-rows-3">
        <Button variant="primary">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="text">Button</Button>
        <Button variant="link">Button</Button>
        <Button variant="primary" isLoading>
          Button
        </Button>
        <Button variant="secondary" isLoading>
          Button
        </Button>
        <Button variant="text" isLoading>
          Button
        </Button>
        <Button variant="link" isLoading>
          Button
        </Button>
        <Button variant="primary" disabled>
          Button
        </Button>
        <Button variant="secondary" disabled>
          Button
        </Button>
        <Button variant="text" disabled>
          Button
        </Button>
        <Button variant="link" disabled>
          Button
        </Button>
      </div>
      <hr className="border-neutral-100" />

      <h1 className="ml-10 mt-10 text-title-1">Input Component</h1>
      <div className="w-[300px] m-10">
        <Input placeholder="텍스트를 입력하세요" className="mb-5" />
        <Input
          placeholder="텍스트를 입력하세요"
          label="이 필드의 제목"
          className="mb-5"
        />
        <Input placeholder="텍스트를 입력하세요" disabled className="mb-5" />
        <Input
          placeholder="텍스트를 입력하세요"
          label="이 필드의 제목"
          disabled
          className="mb-5"
        />
        <Input placeholder="텍스트를 입력하세요" error className="mb-5" />
        <Input
          placeholder="텍스트를 입력하세요"
          label="이 필드의 제목"
          error
          className="mb-5"
        />
        <Input
          placeholder="텍스트를 입력하세요"
          label="이 필드의 제목"
          error="에러가 발생했습니다"
          className="mb-5"
        />
      </div>
      <hr className="border-neutral-100" />

      <h1 className="ml-10 mt-10 text-title-1">Checkbox Component</h1>
      <div className="w-auto m-10">
        <Checkbox className="mb-1">체크박스</Checkbox>
        <Checkbox className="mb-1" checked>
          체크박스
        </Checkbox>
        <Checkbox className="mb-1" checked disabled>
          체크박스
        </Checkbox>
        <Checkbox disabled>체크박스</Checkbox>
      </div>
    </>
  );
}
