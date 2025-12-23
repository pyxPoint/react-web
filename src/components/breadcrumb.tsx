import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { IoHomeOutline } from "react-icons/io5";

const Breadcrumb = () => {
  // const { pageTitle } = usePageStore();
  return (
    <div>
      <Breadcrumbs
        className="pl-2"
        itemClasses={{
          item: "text-dark-green data-[current=true]:text-yellow",
          separator: "text-dark-green"
        }}>
        <BreadcrumbItem href="/" startContent={<IoHomeOutline />}>
          <label className="ml-2">Home</label>
        </BreadcrumbItem>
        {/*     <BreadcrumbItem href="/{pageTitle}">{pageTitle}</BreadcrumbItem> */}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
