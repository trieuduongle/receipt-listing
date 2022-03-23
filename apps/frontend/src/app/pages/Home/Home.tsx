import { PageHeader } from 'antd';
import { PageContent } from '~/components';
import { ArchiveMenu } from './ArchiveMenu';
import { UploadReceiptMenu } from './UploadReceiptMenu';

export const Home = () => {
  return (
    <>
      <PageHeader title="Home"></PageHeader>

      <PageContent>
        <UploadReceiptMenu />
        <ArchiveMenu />
      </PageContent>
    </>
  );
};
