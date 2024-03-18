import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CloudinaryImg from './CloudinaryImg'

// COMPONENTS
import DeleteCoursePopup from './DeleteCoursePopup';

// ICONS

import {
    Container,
    ThumbnailContainer,
    RightContainer,
    DetailsContainer,
    Title,
    Description,
    ActionContainer,
    OpenButton,
    EditButton,
    DeleteButton,
    BottomActionContainer,
    Wrapper,
    BackgroundCloser
} from '../../styles/Author/AddCourseCard.style';


function AddCourseCard({datas,setRefresher}) {
    const [deletePopupOpener, setDeletePopupOpener] = useState(false);

    const videoUrl = datas?.video_url;
    const imageUrl = datas?.image_url;
    const subjectCount = datas?.subjects.length;
    const courseId = datas?._id;
    const title = datas?.title;

  return (
    <>
    {deletePopupOpener && 
    <>
        <DeleteCoursePopup setRefresher={setRefresher} title={title} videoUrl={videoUrl} imageUrl={imageUrl} subjectCount={subjectCount} courseId={courseId} setDeletePopupOpener={setDeletePopupOpener} />
        <BackgroundCloser onClick={e => setDeletePopupOpener(false)} />
    </>
    }
    
    <Container>
        <Wrapper>
            <ThumbnailContainer>
                <CloudinaryImg imageUrl={datas?.image_url} width='240' height='120' widthMain='100%' />
            </ThumbnailContainer>
            
            <RightContainer>
                <DetailsContainer>
                    <Title>{datas?.title}</Title>
                    
                    <Description>{datas?.desc}</Description>
                </DetailsContainer>

                <ActionContainer>
                    <Link to={`/author/add-course/course-setup?course-id=${datas._id}`}>
                        <OpenButton>Open</OpenButton>
                    </Link>
                    
                    <EditButton>Edit</EditButton>

                    <DeleteButton onClick={e => setDeletePopupOpener(true)}>Delete</DeleteButton>
                </ActionContainer>
            </RightContainer>
        </Wrapper>
        {/* BOTTOM ACTION CONTAINER */}
        <BottomActionContainer>
                <Link to={`/author/add-course/course-setup?course-id=${datas._id}`} style={{width:'100%'}}>
                    <OpenButton>Open</OpenButton>
                </Link>

                <EditButton>Edit</EditButton>

                <DeleteButton onClick={e => setDeletePopupOpener(true)}>Delete</DeleteButton>
                
        </BottomActionContainer>
    </Container>
    </>
  )
}

export default AddCourseCard