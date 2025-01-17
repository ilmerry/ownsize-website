import { useState } from 'react';
import { CategoryDeleteIcon, CategoryEditIcon } from 'assets/icon';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import theme from 'styles/theme';
import { ClosetOutput } from 'types/allCloset/client';

import DeleteCategoryModal from '@/components/category/DeleteCategoryModal';
import ModifyCategoryModal from '@/components/category/ModifyCategoryModal';
import ModalPortal from '@/components/common/modal/ModalPortal';
import HomeMain from '@/components/home/HomeMain';
import { useFetchCategoryDetail } from '@/hooks/queries/allCloset';
import { Toast } from 'components/common/Toast/Toast';
import useToast from 'components/common/Toast/useToast';

import CategoryDetailFirst from './CategoryDetailFirst';

function CategoryDetailLanding() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isOpenToast, message, showToast } = useToast();

  const {
    query: { id },
  } = useRouter();
  const categoryId = id as string;

  const orderSortById = (item: ClosetOutput[]) => {
    return item.sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
  };
  const orderSortByTime = (item: ClosetOutput[]) => {
    return item.sort((a, b) => {
      return Number(b.updateInPinAt) - Number(a.updateInPinAt);
    });
  };

  const data = useFetchCategoryDetail(categoryId);

  let orderedData: ClosetOutput[] = [];
  let categoryName = '';

  if (data) {
    categoryName = data[2].categoryName;
    const newArray: ClosetOutput[] = [];
    for (let index = 0; index < data[0].length; index++) {
      const isInPinObject = data[1].find((item) => item.productId === data[0][index].id);
      newArray.push(
        Object.assign(
          {},
          data[0][index],
          { isInPin: isInPinObject?.isInPin },
          { updateInPinAt: isInPinObject?.updateInPinAt }
        )
      );
    }
    const pinData: ClosetOutput[] = orderSortByTime(newArray.filter((data) => data.isInPin));
    const noPinData: ClosetOutput[] = orderSortById(newArray.filter((data) => !data.isInPin));
    orderedData = pinData.concat(noPinData);
  }

  const onClickDeleteCategoryModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const onClickModifyCategoryModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <Styled.Root>
      <Styled.categoryNameContainer>
        <Styled.categoryName>{categoryName}</Styled.categoryName>
        <div>
          <Image
            src={CategoryEditIcon}
            onClick={onClickModifyCategoryModal}
            width={58}
            height={58}
            alt="카테고리 제목 편집 아이콘"
            placeholder="blur"
            priority
          />
          <Image
            src={CategoryDeleteIcon}
            onClick={onClickDeleteCategoryModal}
            width={58}
            height={58}
            alt="카테고리 삭제 아이콘"
            placeholder="blur"
            priority
          />
        </div>
      </Styled.categoryNameContainer>
      {data && data[0].length !== 0 ? (
        <HomeMain data={orderedData} showToastDetail={showToast} categoryId={categoryId} page="categoryDetail" />
      ) : (
        <CategoryDetailFirst />
      )}
      {isEditModalOpen && (
        <ModifyCategoryModal
          onClickModifyCategoryModal={onClickModifyCategoryModal}
          categoryId={categoryId}
          categoryName={typeof categoryName === 'string' ? categoryName : ''}
          showToast={showToast}
        />
      )}
      {isDeleteModalOpen && (
        <ModalPortal>
          <DeleteCategoryModal
            onClickDeleteCategoryModal={onClickDeleteCategoryModal}
            deletedCategoryId={Number(categoryId)}
            showToast={showToast}
          />
        </ModalPortal>
      )}
      {isOpenToast && (
        <Styled.ToastContainer>
          <Toast width="42.6" message={message} />
        </Styled.ToastContainer>
      )}
    </Styled.Root>
  );
}

export default CategoryDetailLanding;

const Styled = {
  Root: styled.div`
    width: 140.8rem;
    margin: 9.4rem auto 0;
  `,
  categoryNameContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5.8rem;
    border-bottom: 0.3rem solid ${theme.colors.gray200};
    padding-bottom: 1.3rem;

    & > div {
      & > img {
        cursor: pointer;
      }
    }
  `,
  categoryName: styled.h1`
    ${theme.fonts.title2};
  `,
  ToastContainer: styled.div`
    position: fixed;
    bottom: 5.2rem;
    z-index: 15;
    display: flex;
    align-items: center;
    margin-left: 50.4rem;
  `,
};
