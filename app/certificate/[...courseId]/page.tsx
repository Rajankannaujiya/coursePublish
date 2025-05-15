import { getCertificate } from '@/app/actions/cetificate';
import CertificateComp from '@/app/components/CertificateComp';
import React from 'react'

const page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = await params;

  const acturalId = courseId[0];
  const certificateData = await getCertificate(acturalId);

  console.log(certificateData)
  return (
    certificateData.data && <CertificateComp certificateContent={certificateData.data} />
  )
}

export default page