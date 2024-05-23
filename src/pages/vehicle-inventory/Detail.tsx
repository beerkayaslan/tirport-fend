import { Avatar, Col, Flex, message, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import { IdIcon, VehicleInventoryIcon } from '@/assets/icons';
import BlurScreen from '@/components/BlurScreen';
import FallbackPageWrapper from '@/components/Fallback/FallbackPageWrapper';
import FileUpload from '@/components/FileUpload/Index';
import {
  useCompanyVehicleUpdateByIdMutation,
  useGetCompanyVehicByIdQuery
} from '@/store/api/company/api';
import { CompanyVehicleAddRequestDto } from '@/types/company/type';
import { Response } from '@/types/utils';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCompanyVehicByIdQuery({ id });
  const [updateVehicle] = useCompanyVehicleUpdateByIdMutation();

  const updateHandle = (body: CompanyVehicleAddRequestDto) => {
    updateVehicle({
      body: {
        ...data,
        ...body
      },
      id: id as string
    })
      .unwrap()
      .then(() => {
        message.success('Başarılı bir şekilde güncellendi.');
      })
      .catch((err: Response) => {
        message.error(err.data.message);
      });
  };

  return (
    <FallbackPageWrapper>
      {isLoading && <BlurScreen />}
      <div className="mb-8 flex items-center gap-x-2.5">
        <VehicleInventoryIcon />
        <span className="text-lg font-semibold">Araç Detay</span>
      </div>

      <Row gutter={32}>
        <Col span={6}>
          <div className="p-4 shadow">
            <div className="flex flex-col items-center justify-center gap-y-3 ">
              <Avatar size={108} />
              <b className="text-lg">{data?.plateNumber}</b>
            </div>
            <div className="flex items-center gap-x-3 py-4">
              <IdIcon />
              {data?.id}
            </div>
            <div className="flex items-center justify-between">
              <b className="text-base">Atanan Sürücüler</b>
              <span className="cursor-pointer select-none underline">Tümünü Gör</span>
            </div>
            <div>
              <div className="flex items-center gap-x-2 py-2">
                <Avatar size={24} />
                <span>Ali Yılmaz</span>
              </div>
              <div className="flex items-center gap-x-2 py-2">
                <Avatar size={24} />
                <span>Ali Yılmaz</span>
              </div>
            </div>
            <div className="mt-10">
              <b>Ekleyen</b>
              <p className="mb-3">Mustafa Kubilay Kapkara</p>
              <b>Kayıt Tarihi</b>
              <p>{dayjs(data?.createdAt).format('DD.MM.YYYY')}</p>
            </div>
          </div>
        </Col>
        <Col span={10}>
          <span className="mb-5 block text-lg font-semibold">Araç Bilgileri</span>
          <Space direction="vertical" size={16}>
            <Flex align="center">
              <b className="w-52 text-primary-light">Envanter</b>
              <b>{data?.ownershipType}</b>
            </Flex>
            <Flex align="center">
              <b className="w-52 text-primary-light">Marka</b>
              <b>{data?.brand}</b>
            </Flex>
            <Flex align="center">
              <b className="w-52 text-primary-light">Yıl</b>
              <b>{data?.year}</b>
            </Flex>
            <Flex align="center">
              <b className="w-52 text-primary-light">Araç Tipi</b>
              <b>{data?.truckType}</b>
            </Flex>
            <Flex align="center">
              <b className="w-52 text-primary-light">Kasa Tipi</b>
              <b>{data?.trailer}</b>
            </Flex>
            <Flex align="center">
              <b className="w-52 text-primary-light">Çekici Net Ağırlık</b>
              <b>{data?.truckNetWeight && `${data?.truckNetWeight} kg`} </b>
            </Flex>
            {data?.trailerNetWeight && data.trailerNetWeight > 0 && (
              <Flex align="center">
                <b className="w-52 text-primary-light">Römork Net Ağırlık</b>
                <b>{data.trailerNetWeight} kg</b>
              </Flex>
            )}
            {data?.trailerMaxWeight && data?.trailerMaxWeight > 0 && (
              <Flex align="center">
                <b className="w-52 text-primary-light">Römork Azami Ağırlık</b>
                <b>{data?.trailerMaxWeight} kg</b>
              </Flex>
            )}
            {data?.contractEndDate && (
              <Flex align="center">
                <b className="w-52 text-primary-light">Kira Bitiş Tarihi</b>
                <b>{dayjs(data?.contractEndDate).format('DD.MM.YYYY')}</b>
              </Flex>
            )}
            <Flex align="center">
              <b className="w-52 text-primary-light">Araç Sigorta Bitiş Tarihi</b>
              <b>
                {data?.truckInsuranceEndDate &&
                  dayjs(data.truckInsuranceEndDate).format('DD.MM.YYYY')}
              </b>
            </Flex>
            {data?.trailerInsuranceEndDate && (
              <Flex align="center">
                <b className="w-52 text-primary-light">Çekici Sigorta Bitiş Tarihi</b>
                <b>{dayjs(data.trailerInsuranceEndDate).format('DD.MM.YYYY')}</b>
              </Flex>
            )}
          </Space>
        </Col>
        <Col span={8}>
          <span className="mb-5 block text-lg font-semibold">Araç Belgeleri</span>
          <Space direction="vertical" className="w-full">
            <FileUpload
              text="Çekici Ruhsatı"
              onDone={(file) => updateHandle({ truckRegistrationFile: file })}
              fileName={data?.truckRegistrationFile}
            />
            <FileUpload
              text="Çekici Sigortası"
              onDone={(file) => updateHandle({ truckInsuranceFile: file })}
              fileName={data?.truckInsuranceFile}
            />
            <FileUpload
              text="Römork Ruhsatı"
              onDone={(file) => updateHandle({ trailerRegistrationFile: file })}
              fileName={data?.trailerRegistrationFile}
            />
            <FileUpload
              text="Römork Sigortası"
              onDone={(file) => updateHandle({ trailerInsuranceFile: file })}
              fileName={data?.trailerInsuranceFile}
            />
            <FileUpload
              text="Kira Sözleşmesi"
              onDone={(file) => updateHandle({ rentalContractFile: file })}
              fileName={data?.rentalContractFile}
            />
          </Space>
        </Col>
      </Row>
    </FallbackPageWrapper>
  );
}
