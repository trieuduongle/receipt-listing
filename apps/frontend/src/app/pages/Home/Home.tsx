import { PageHeader } from 'antd';
import { useEffect } from 'react';
import { PageContent } from '~/components';
import { useAuth } from '~/hooks/auth.hook';
import { ArchiveMenu } from './ArchiveMenu';
import { UploadReceiptMenu } from './UploadReceiptMenu';

export const Home = () => {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth);
  }, [auth]);

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
