import React, { Component } from 'react'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import UspModal from './../uspmodal/UspModal'
import UspButton from './../../../components/UspButton/UspButton'
import Footer from './../footer/Footer'

let ProfileImageBody = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: this.props.imageSrc,
            zoomRatio: 0,
            showModal: false,
            errorMessage: '',
            isConfirmButtonDisabled: this.props.imageSrc ? false : true,
            isRemovedDisabled: true,
            isPhotoDeleted: false,
            errorMessageText: 'JPG or PNG. Maximum File size: 1 MB'
        };
        this.imageZoomSteps = 0.01;
        this.minZoomRange = 0;
        this.maxZoomRange = 0.2;
        this.fileType = ['jpg', 'jpeg', 'png']
        // 1 Mb file size
        this.maxImageSize = 1048576;
    }

    uploadImage = (e) => {
        e.preventDefault();
        this.refs.uploader.click();
    }

    onImageCrop = () => {
        if (this.state.isPhotoDeleted) {
            this.props.onPhotoDelete();
        } else {
            this.props.onImageConfirm(this.refs.cropper);
        }
    }

    onImageSliderChange = (e) => {
        e.preventDefault();
        let value;
        if (e.target.value < this.state.zoomRatio) {
            value = -(this.state.zoomRatio);
            this.setState({
                'zoomRatio': (this.state.zoomRatio - this.imageZoomSteps), 'isConfirmButtonDisabled': false
            });
        } else {
            value = this.state.zoomRatio + this.imageZoomSteps;
            this.setState({ 'zoomRatio': value, 'isConfirmButtonDisabled': false });
        }
        this.refs.cropper.cropper.zoom(value);

    }
    onImageChange = (e) => {
        let reader = new FileReader();
        let file = this.refs.uploader.files[0];
        reader.onloadend = () => {
            if (file.size > this.maxImageSize) {
                this.setState({ errorMessage: 'oversize', errorMessageText: 'Invalid File. Max 1 MB is allowed only' });
                return;
            } else if (this.fileType.indexOf(file.name.split('.')[1].toLowerCase()) === -1) {
                this.setState({ errorMessage: 'oversize', errorMessageText: 'Invalid File. PNG or JPG is allowed only' });
                return;
            } else {
                this.setState({
                    file: file, imagePreviewUrl: reader.result, errorMessage: '', isPhotoDeleted: false,
                    errorMessageText: 'JPG or PNG. Maximum File size: 1 MB', 'isConfirmButtonDisabled': false, isRemovedDisabled: false
                });
            }
        }
        reader.readAsDataURL(file)
    }

    onRemove = (e) => {
        this.refs.uploader.value = '';
        if (this.props.isEditMode) {
            this.setState({ 'imagePreviewUrl': '', 'isConfirmButtonDisabled': false, isRemovedDisabled: true, isPhotoDeleted: true })
        } else {
            this.setState({ 'imagePreviewUrl': '', 'isConfirmButtonDisabled': true, isRemovedDisabled: true, isPhotoDeleted: false })
        }
    }

    render() {
        let self = this;
        let { imagePreviewUrl, isRemovedDisabled } = self.state;
        let $imagePreview = null;
        let uploadButtonDisabled = false;
        let isSlidderDisabled;
        let isRemovedButtonDisabled = isRemovedDisabled;
        if (imagePreviewUrl) {
            uploadButtonDisabled = true
            isRemovedButtonDisabled = false
            isSlidderDisabled = false;
            $imagePreview = (<Cropper
                dragMode={'move'}
                viewMode={1}
                aspectRatio={1 / 1}
                movable={true}
                cropBoxMovable = {false}
                guides={false}
                background={false}
                ref='cropper'
                src={imagePreviewUrl}
                minCanvasWidth={128}
                minCanvasHeight={128}
                minCropBoxWidth={128}
                minCropBoxHeight={128}
                zoomOnWheel={false}
                style={{
                    height: 250,
                    width: 250
                }} />);
        } else {
            isSlidderDisabled = true
            $imagePreview = (
                <span className='profile-image-upload'></span>
            );
        }
        return (
            <div className='row profile_image_body'>
                <div className='col-md-12'>
                    <div className='row flex-stretch'>
                        <div className='col-md-6'>
                            {$imagePreview}
                        </div>
                        <div className='col-md-6 flex-center upload_button'>
                            <div>
                                <UspButton
                                    disabled={uploadButtonDisabled}
                                    cssClass="btn btn-secondary"
                                    type='file'
                                    text='UPLOAD PHOTO'
                                    onClick={(e) => self.uploadImage(e)} />
                                <span className={'info-block ' + self.state.errorMessage}>{this.state.errorMessageText}&nbsp;</span>
                            </div>
                            <input
                                type="file"
                                className='file_upload'
                                accept="image/jpeg, image/png"
                                ref='uploader'
                                onChange={(e) => self.onImageChange(e)} />
                        </div>
                    </div>
                    <div className='row flex-stretch'>
                        <div className='col-md-6'>

                            <div className='image-sizer'>
                                <span className='image-slider-start'></span>
                                <input
                                    className='slider'
                                    disabled={isSlidderDisabled}
                                    id="slider1"
                                    type="range"
                                    min={self.minZoomRange}
                                    max={self.maxZoomRange}
                                    step={self.imageZoomSteps}
                                    value={self.state.zoomRatio}
                                    onChange={(e) => self.onImageSliderChange(e)} />
                                <span className='image-slider-end'></span>
                            </div>
                        </div>
                    </div>
                    <div className='row flex-stretch'>
                        <div className='col-md-12'>
                            <Footer noPadding>
                                <UspButton cssClass="btn-tertiary" type='button' onClick={self.props.hideModal} text='CANCEL' />
                                <UspButton disabled={isRemovedButtonDisabled} cssClass="btn-tertiary" type='button' text='REMOVE' onClick={self.onRemove} />
                                <UspButton disabled={self.state.isConfirmButtonDisabled}
                                    cssClass="btn-primary"
                                    type='button'
                                    text='CONFIRM'
                                    onClick={(e) => self.onImageCrop(e)} />
                            </Footer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default class ProfileImageUploader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let self = this;
        let modelTitle = self.props.isEditMode ? 'UPDATE PROFILE PICTURE' : 'ADD PROFILE PICTURE'
        return (
            <div>
                <UspModal
                    dialogClassName="image-upload-modal"
                    modalTitle={modelTitle}
                    isVisible={self.props.show}
                    hideModal={self.props.onHide}>
                    <ProfileImageBody hideModal={self.props.onHide}
                        imageSrc={self.props.imageSrc}
                        isEditMode={self.props.isEditMode}
                        onPhotoDelete={(e) => self.props.onPhotoDelete(e)}
                        onImageConfirm={(e) => self.props.onImageConfirm(e)} />
                </UspModal>
            </div>
        )
    }
}
