import { BackButton, Button, Checkbox, Input } from '@/features/core';

export function ComponentTestFrame() {
  return (
    <div className="">
      <h1 className="text-title-1 mt-10 ml-10">Typography</h1>
      <div className="m-10">
        <div className="mb-2 flex">
          <div className="text-title-1 mr-4 w-[200px]">Title 1</div>
          <div className="text-title-1 mr-4 w-[120px]">22px</div>
          <div className="text-title-1 mr-4 w-[120px]">700</div>
          <div className="text-title-1 w-[120px]">150%</div>
        </div>
        <div className="mb-2 flex">
          <div className="text-title-2 mr-4 w-[200px]">Title 2</div>
          <div className="text-title-2 mr-4 w-[120px]">18px</div>
          <div className="text-title-2 mr-4 w-[120px]">600</div>
          <div className="text-title-2 w-[120px]">150%</div>
        </div>
        <div className="mb-2 flex">
          <div className="text-title-3 mr-4 w-[200px]">Title 3</div>
          <div className="text-title-3 mr-4 w-[120px]">16px</div>
          <div className="text-title-3 mr-4 w-[120px]">600</div>
          <div className="text-title-3 w-[120px]">150%</div>
        </div>
        <div className="mb-2 flex">
          <div className="text-body-1 mr-4 w-[200px]">Body 1</div>
          <div className="text-body-1 mr-4 w-[120px]">16px</div>
          <div className="text-body-1 mr-4 w-[120px]">400</div>
          <div className="text-body-1 w-[120px]">150%</div>
        </div>
        <div className="mb-2 flex">
          <div className="text-body-2 mr-4 w-[200px]">Body 2</div>
          <div className="text-body-2 mr-4 w-[120px]">14px</div>
          <div className="text-body-2 mr-4 w-[120px]">400</div>
          <div className="text-body-2 w-[120px]">140%</div>
        </div>
        <div className="mb-2 flex">
          <div className="text-label-1 mr-4 w-[200px]">Label 1</div>
          <div className="text-label-1 mr-4 w-[120px]">14px</div>
          <div className="text-label-1 mr-4 w-[120px]">400</div>
          <div className="text-label-1 w-[120px]">120%</div>
        </div>
        <div className="mb-2 flex">
          <div className="text-label-2 mr-4 w-[200px]">Label 2</div>
          <div className="text-label-2 mr-4 w-[120px]">12px</div>
          <div className="text-label-2 mr-4 w-[120px]">400</div>
          <div className="text-label-2 w-[120px]">120%</div>
        </div>
      </div>
      <hr className="border-neutral-100" />

      <h1 className="text-title-1 mt-10 ml-10">Color Palette</h1>
      <div className="m-10">
        <div className="text-title-2 mb-5">Primary</div>
        <div className="mb-5 grid h-20 w-[1280px] grid-cols-11 grid-rows-1 gap-2">
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
        <div className="mb-5 grid h-20 w-[1280px] grid-cols-11 grid-rows-1 gap-2">
          <div className="rounded-[8px] bg-red-50"></div>
          <div className="rounded-[8px] bg-red-100"></div>
          <div className="rounded-[8px] bg-red-200"></div>
          <div className="rounded-[8px] bg-red-300"></div>
          <div className="rounded-[8px] bg-red-400"></div>
          <div className="rounded-[8px] bg-red-500"></div>
          <div className="rounded-[8px] bg-red-600"></div>
          <div className="rounded-[8px] bg-red-700"></div>
          <div className="rounded-[8px] bg-red-800"></div>
          <div className="rounded-[8px] bg-red-900"></div>
          <div className="rounded-[8px] bg-red-950"></div>
        </div>

        <div className="text-title-2 mb-5">Neutral</div>
        <div className="mb-5 grid h-20 w-[1280px] grid-cols-11 grid-rows-1 gap-2">
          <div className="rounded-[8px] bg-neutral-50"></div>
          <div className="rounded-[8px] bg-neutral-100"></div>
          <div className="rounded-[8px] bg-neutral-200"></div>
          <div className="rounded-[8px] bg-neutral-300"></div>
          <div className="rounded-[8px] bg-neutral-400"></div>
          <div className="rounded-[8px] bg-neutral-500"></div>
          <div className="rounded-[8px] bg-neutral-600"></div>
          <div className="rounded-[8px] bg-neutral-700"></div>
          <div className="rounded-[8px] bg-neutral-800"></div>
          <div className="rounded-[8px] bg-neutral-900"></div>
          <div className="rounded-[8px] bg-neutral-950"></div>
        </div>
      </div>
      <hr className="border-neutral-100" />

      <h1 className="text-title-1 mt-10 ml-10">Button Component</h1>
      <div className="m-10 grid w-[700px] grid-cols-5 grid-rows-3 gap-5">
        <Button variant="primary">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="default">Button</Button>
        <Button variant="text">Button</Button>
        <Button variant="link">Button</Button>
        <Button variant="primary" isLoading />
        <div className="col-span-1" />
        <Button variant="default" isLoading />
        <div className="col-span-1" />
        <div className="col-span-1" />
        <Button variant="primary" disabled>
          Button
        </Button>
        <Button variant="secondary" disabled>
          Button
        </Button>
        <Button variant="default" disabled>
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

      <h1 className="text-title-1 mt-10 ml-10">Input Component</h1>
      <div className="m-10 w-[300px]">
        <Input placeholder="텍스트를 입력하세요" className="mb-5" />
        <Input
          placeholder="텍스트를 입력하세요"
          label="이 필드의 제목"
          required
          className="mb-5"
          suffix={
            <Button variant="secondary" className="w-17.5">
              확인
            </Button>
          }
        />
        <Input placeholder="텍스트를 입력하세요" disabled className="mb-5" />
        <Input
          placeholder="텍스트를 입력하세요"
          label="이 필드의 제목"
          disabled
          className="mb-5"
        />
        <Input
          placeholder="텍스트를 입력하세요"
          label="이 필드의 제목"
          disabled
          className="mb-5"
          suffix={
            <Button variant="secondary" className="w-17.5">
              확인
            </Button>
          }
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
          required
          suffix={
            <Button variant="secondary" className="w-17.5">
              확인
            </Button>
          }
        />
      </div>
      <hr className="border-neutral-100" />

      <h1 className="text-title-1 mt-10 ml-10">Checkbox Component</h1>
      <div className="m-10 w-auto">
        <Checkbox className="mb-1">체크박스</Checkbox>
        <Checkbox className="mb-1" defaultChecked>
          체크박스
        </Checkbox>
        <Checkbox disabled>체크박스</Checkbox>
        <Checkbox className="mb-1" defaultChecked disabled>
          체크박스
        </Checkbox>
      </div>
      <hr className="border-neutral-100" />

      <h1 className="text-title-1 mt-10 ml-10">Undo Component</h1>
      <div className="m-10 w-auto">
        <BackButton className="mb-1">로그인 화면으로 돌아가기</BackButton>
        <BackButton>뒤로가기</BackButton>
      </div>
    </div>
  );
}
