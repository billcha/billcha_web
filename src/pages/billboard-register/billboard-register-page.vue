<template>
  <div class="billboard-register-page wrapper" v-common-loading-panel="loading">
    <div class="start-page" v-if="step === 0">
      <div class="img register-image"></div>
      <div class="title">광고판 등록하기</div>
      <div class="desc">
        <div>∙  광고판 등록은 매체 <span class="emphasis">소유주가 직접 올리는 것</span>을 원칙으로 합니다.</div>
        <div>∙  소유하지 않은 매체를 대행사가 올려서 영업 할 수 없습니다. </div>
        <div class="sub">단, 컨소시엄 형태로 하나의 매체를 여러 회사가 관리하는 부분은 가능합니다</div>
      </div>
      <button class="button primary next-btn margin-center" @click="startRegisterBillboard">계속</button>
    </div>
    <div class="step-container" v-else-if="step <= 4">
      <div class="step-status">
        <div class="title">{{ stepStatusTitle }}</div>
        <div class="line">
          <div class="active" v-bind:style="{ 'width' : step * 25 + '%' }"></div>
        </div>
        <div class="sub-title" v-if="step === 4">∙ 이력을 작성하시면 광고주와의 매칭 확률이 높아집니다!</div>
      </div>

      <div class="step-inner" :class="'step-' + step" v-show="step === 1">
        <div class="form">
          <div class="input-box">
            <div class="key">회사명</div>
            <common-vaildator
              :model="stepData[stepIndexName.step1].companyName"
              :rules="'required'"
              :name="'companyName'"
              :type="'text'"
              :placeholder="'회사명'"
              :subDesc="'∙ 사업자등록증에 작성된 명칭으로 정확히 기재해주세요.'"
              :errorMessage="'회사명을 입력해주세요'"
              @onChange="(val) => stepData[stepIndexName.step1].companyName = val"
              ref="companyName"
            ></common-vaildator>
          </div>
          <div class="input-box address">
            <input-zipcode
              :title="'회사 주소'"
              :postcode="stepData[stepIndexName.step1].zipCode.postcode"
              :address="stepData[stepIndexName.step1].zipCode.address"
              :detailAddress="stepData[stepIndexName.step1].zipCode.detailAddress"
              :subDesc="'∙ 사업자등록증에 작성된 주소로 정확히 기재해주세요.'"
              @onChange="changeZipcodeStep1"
              ref="zipCode"
            ></input-zipcode>
          </div>
          <div class="input-box">
            <div class="key">사업자등록번호</div>
            <common-vaildator
              :model="stepData[stepIndexName.step1].companyRegistrationNumber"
              :rules="'required'"
              :name="'companyRegistrationNumber'"
              :type="'number'"
              :placeholder="'0000-00000-00000'"
              :errorMessage="'사업자등록번호를 입력해주세요'"
              ref="companyRegistrationNumber"
              @onChange="(val) => stepData[stepIndexName.step1].companyRegistrationNumber = val"
            ></common-vaildator>
          </div>
          <div class="input-box">
            <div class="key">사업자등록증 사본</div>
            <div class="value">
              <input-file @onChange="onChangeCopyCompanyRegistrationNumber"
                :errorMessage="'사업자 등록증을 업로드해주세요'"
                :subDesc="'∙ Fax로도 제출이 가능합니다  0504-499-3321'"
                ref="copyCompanyRegistrationNumber"
              ></input-file>
            </div>
          </div>
          <div class="input-box">
            <div class="key">대표자 성명</div>
            <common-vaildator
              :model="stepData[stepIndexName.step1].representativeName"
              :rules="'required'"
              :name="'representativeName'"
              :type="'text'"
              :placeholder="'대표자 성명'"
              :errorMessage="'대표자 성명을 입력해주세요'"
              ref="representativeName"
              @onChange="(val) => stepData[stepIndexName.step1].representativeName = val"
            ></common-vaildator>
          </div>
          <div class="input-box">
            <div class="key">담당자 성명</div>
            <common-vaildator
              :model="stepData[stepIndexName.step1].personInCharge.name"
              :rules="'required'"
              :name="'personInChargeName'"
              :type="'text'"
              :placeholder="'담당자 성명'"
              :errorMessage="'담당자 성명을 입력해주세요'"
              ref="personInChargeName"
              @onChange="(val) => stepData[stepIndexName.step1].personInCharge.name = val"
            ></common-vaildator>
          </div>
          <div class="input-box">
            <div class="key">담당자 연락처</div>
            <common-vaildator
              :model="stepData[stepIndexName.step1].personInCharge.phoneNumber"
              :rules="'required|phoneNumber'"
              :vvName="'담당자 연락처'"
              :name="'personInChargePhoneNumber'"
              :type="'tel'"
              :placeholder="'담당자 연락처'"
              :errorMessage="'담당자 연락처를 입력해주세요'"
              ref="personInChargePhoneNumber"
              @onChange="(val) => stepData[stepIndexName.step1].personInCharge.phoneNumber = val"
            ></common-vaildator>
          </div>
          <div class="input-box">
            <div class="key">담당자 이메일</div>
            <common-vaildator
              :model="stepData[stepIndexName.step1].personInCharge.email"
              :rules="'required|email'"
              :vvName="'이메일'"
              :name="'personInChargeEmail'"
              :type="'text'"
              :placeholder="'담당자 이메일'"
              :errorMessage="'담당자 이메일를 입력해주세요'"
              ref="personInChargeEmail"
              @onChange="(val) => stepData[stepIndexName.step1].personInCharge.email = val"
            ></common-vaildator>
          </div>
        </div>
      </div>
      <div class="step-inner" :class="'step-' + step" v-show="step === 2">
        <div class="form">
          <div class="input-box">
            <div class="key">매체(광고판) 승인서</div>
            <div class="value">
              <input-file @onChange="onChangeBillBoardApproval"
                :text="'파일첨부'"
                :subDesc="'∙ 지자체 안전관리 및 매체 사용 허가증'"
                :errorMessage="'매체(광고판) 승인서를 업로드해주세요'"
                ref="billBoardApproval"
              ></input-file>
            </div>
          </div>
          <div class="input-box radio">
            <div class="key">종류</div>
            <div class="radio-box cols">
              <div class="col-6" v-for="item in stepData[stepIndexName.step2].formData.category" :key="item.id" :class="{ 'etc' : item.value === 'etc'}">
                <label class="radio-container">
                  {{ item.label }}
                  <input type="radio" v-model="stepData[stepIndexName.step2].billBoardCategory" :value="item.value">
                  <span class="checkmark"></span>
                </label>
                <input class="input" type="text" v-model="stepData[stepIndexName.step2].billBoardCategoryEtcValue" :disabled="stepData[stepIndexName.step2].billBoardCategory !== 'etc'" v-if="item.value === 'etc'">
                <div v-show="localError.billBoardCategory" class="help is-danger">{{ '종류를 선택해주세요' }}</div>
              </div>
            </div>
          </div>
          <div class="input-box">
            <div class="key">실측 사이즈 (단위 m)</div>
            <common-vaildator
              :model="stepData[stepIndexName.step2].actualSize"
              :rules="'required'"
              :name="'actualSize'"
              :type="'text'"
              :subDesc="'∙ 예시)16*7'"
              :placeholder="'0 x 0'"
              :errorMessage="'실측 사이즈를 입력해주세요'"
              ref="actualSize"
              @onChange="(val) => stepData[stepIndexName.step2].actualSize = val"
            ></common-vaildator>
          </div>
          <div class="input-box radio">
            <div class="key">형태</div>
            <div class="radio-box cols">
              <div class="col-6" v-for="item in stepData[stepIndexName.step2].formData.form" :key="item.id" :class="{ 'etc' : item.value === 'etc'}">
                <label class="radio-container">
                  {{ item.label }}
                  <input type="radio" v-model="stepData[stepIndexName.step2].billBoardForm" :value="item.value">
                  <span class="checkmark"></span>
                </label>
                <input class="input" type="text" v-model="stepData[stepIndexName.step2].billBoardFormEtcValue" :disabled="stepData[stepIndexName.step2].billBoardForm !== 'etc'" v-if="item.value === 'etc'">
                <div v-show="localError.billBoardForm" class="help is-danger">{{ '형태를 선택해주세요' }}</div>
              </div>
            </div>
          </div>
          <div class="input-box">
            <div class="key">해상도 (단위 Pixel)</div>
            <common-vaildator
              :model="stepData[stepIndexName.step2].billBoardResoultion"
              :rules="''"
              :name="'billBoardResoultion'"
              :type="'text'"
              :placeholder="'0px'"
              :errorMessage="'해상도를 입력해주세요'"
              @onChange="(val) => stepData[stepIndexName.step2].billBoardResoultion = val"
            ></common-vaildator>
          </div>
          <div class="input-box address">
            <input-zipcode
              :title="'기본 주소'"
              :postcode="stepData[stepIndexName.step2].defaultZipCode.postcode"
              :address="stepData[stepIndexName.step2].defaultZipCode.address"
              :detailAddress="stepData[stepIndexName.step2].defaultZipCode.detailAddress"
              :subDesc="'∙ 정확한 위치 및 매체 설명은 아래 ‘기타 설명’에 작성해주세요.'"
              @onChange="changedDefaultZipCodeStep2"
              ref="defaultZipCode"
            ></input-zipcode>
          </div>
          <div class="input-box">
            <div class="key">도로명/방향</div>
            <div class="value">
              <input class="input" type="text" placeholder="도로명/방향" v-model="stepData[stepIndexName.step2].roadNameDirection">
              <div class="sub-desc">
                ∙ 매체의 범주에 해당되는 도로명 또는 도로 방향을 적어주세요.<br>
                ∙ 예시) 도산대로, 도산공원사거리에서 을지병원 사거리 방면으로 노출 / 청담동 방면
              </div>
            </div>
            <!-- <common-vaildator
              :model="stepData[stepIndexName.step2].roadNameDirection"
              :rules="'required'"
              :name="'roadNameDirection'"
              :type="'text'"
              :placeholder="'도로명/방향'"
              :errorMessage="'도로명/방향을 입력해주세요'"
            ></common-vaildator> -->
          </div>
          <div class="input-box textarea-box">
            <div class="key">특이사항</div>
            <div class="value">
              <textarea class="textarea has-fixed-size" v-model="stepData[stepIndexName.step2].description" placeholder="특이사항"
               v-shortkey="{enter: ['enter']}" @shortkey="newline"></textarea>
              <div class="sub-desc">
                ∙ 매체 관련 특이사항 및 기타 세부 설명을 적어주세요.<br>
                ∙ 예시) 왕복 10차선, 성수대교에서 진입차량에 노출, 2019년 1월 보수 및 장비 교체
              </div>
            </div>
          </div>
          <div class="input-box">
            <div class="key">매체(광고판) 가격</div>
            <common-vaildator
              :model="stepData[stepIndexName.step2].price"
              :rules="'required|onlyNumber'"
              :name="'price'"
              :type="'text'"
              :subDesc="'∙ 부가세 제외/최소 기간 단위 가격으로 적어주세요.'"
              :placeholder="'매체(광고판) 가격'"
              :errorMessage="'매체(광고판) 가격을 입력해주세요'"
              ref="price"
              @onChange="(val) => stepData[stepIndexName.step2].price = val"
            ></common-vaildator>
          </div>
          <div class="input-box period-minimum">
            <div class="key">집행 최소 기간</div>
            <div class="value">
              <div class="period-minimum-box">
                <input class="input" type="number" placeholder="집행 최소 기간" v-model="stepData[stepIndexName.step2].periodMinimum">
                <common-select class="select-box" :value="this.stepData[this.stepIndexName.step2].selectPeriodMinimum.value" :options="stepData[stepIndexName.step2].selectPeriodMinimum.options" :placeholder="stepData[stepIndexName.step2].selectPeriodMinimum.placeholder" @onSelected="_onChangePeriodMinimumValue"></common-select>
              </div>
              <div class="sub-desc">∙ 집행 가능한 최소 기간을 적어주세요.</div>
            </div>
          </div>
          <div class="input-box">
            <div class="key">설치/제작비(원)</div>
            <!-- <div class="value"><input class="input" type="number" placeholder="설치/제작비" v-model="stepData[stepIndexName.step2].installProductionCost"></div> -->
            <common-vaildator
              :model="stepData[stepIndexName.step2].installProductionCost"
              :rules="'required|onlyNumber'"
              :vvName="'설치/제작비(원)'"
              :name="'installProductionCost'"
              :type="'text'"
              :placeholder="'설치/제작비(원)'"
              :subDesc="'∙ 디자인 작업 포함 여부는 다음 항목에서 체크해주세요.'"
              :errorMessage="'설치/제작비를 입력해주세요'"
              ref="installProductionCost"
              @onChange="(val) => stepData[stepIndexName.step2].installProductionCost = val"
            ></common-vaildator>
          </div>
          <div class="input-box radio design-production-cost">
            <div class="key">디자인 제작비</div>
            <div class="radio-box cols">
              <div class="col-6" v-for="item in stepData[stepIndexName.step2].formData.designProductionCost" :key="item.id" :class="{ 'etc' : item.value === 'etc'}">
                <label class="radio-container">
                  {{ item.label }}
                  <input type="radio" v-model="stepData[stepIndexName.step2].designProductionCost" :value="item.value">
                  <span class="checkmark"></span>
                </label>
                <input class="input" type="text" v-model="stepData[stepIndexName.step2].designProductionCostEtcValue" :disabled="stepData[stepIndexName.step2].designProductionCost !== 'etc'" v-if="item.value === 'etc'">
                <div v-show="localError.designProductionCost" class="help is-danger">{{ '디자인 제작비를 선택해주세요' }}</div>
              </div>
            </div>
          </div>
          <div class="input-box radio management-monitoring">
            <div class="key">관리/모니터링</div>
            <div class="radio-box cols">
              <div class="col-6" v-for="(item, index) in stepData[stepIndexName.step2].formData.managementMonitoring" :key="item.id" :class="{ 'etc' : item.value === 'etc'}">
                <common-checkbox class="" :index="index" :text="item.label" :check="item.check" @onChange="onChangeManagementMonitoring"></common-checkbox>
                <input class="input" type="text" v-model="stepData[stepIndexName.step2].managementMonitoringEtcValue" :disabled="!stepData[stepIndexName.step2].formData.managementMonitoring[4].check" v-if="item.value === 'etc'">
                <div v-show="localError.managementMonitoring" class="help is-danger">{{ '디자인 제작비를 선택해주세요' }}</div>
              </div>
            </div>
          </div>
          <div class="input-box">
            <div class="key">관리 기한</div>
            <div class="value">
              <common-calendar-inline :startDate="stepData[stepIndexName.step2].calendar.startDate" :endDate="stepData[stepIndexName.step2].calendar.endDate" :position="'right'"
                  @setFilterDate="setFilterDate" @openPopup="_openPopup" :detailMode="true"  ref="commonCalendarInline"></common-calendar-inline>
              <div v-show="localError.step2Calendar" class="help is-danger">{{ '관리기한을 선택해주세요' }}</div>
            </div>
          </div>
          <div class="input-box">
            <div class="key">광고판 사진 첨부</div>
            <div class="value">
              <input-file @onChange="onChangeBillBoardPhotoFile"
                :text="'이미지첨부'"
                :errorMessage="'광고판 사진을 업로드해주세요'"
                :multiple="true"
                ref="billBoardPhotoFile"
              ></input-file>
            </div>
          </div>
        </div>
      </div>
      <div class="step-inner" :class="'step-' + step" v-show="step === 3">
        <div class="input-box">
          <div class="key">최저가 인증 계약서 </div>
          <div class="value">
            <input-file @onChange="onChangeLowestPriceVerification" :text="'파일 첨부'"
              :subDesc="'∙ 빌차 서비스와 최저가 계약을 한 경우 발급됩니다.<br>∙ 계약 시 최저가 인증마크와 함께 매체가 게시됩니다.'" ></input-file>
          </div>
        </div>
      </div>
      <div class="step-inner" :class="'step-' + step" v-show="step === 4">
        <div class="form">
          <div class="input-box">
            <div class="key">광고주</div>
            <div class="value">
              <input class="input" type="text" placeholder="광고주" v-model="stepData[stepIndexName.step4].advertiser">
              <div class="sub-desc">∙ 광고주 또는 회사명을 적어주세요.</div>
            </div>
          </div>
          <div class="input-box">
            <div class="key">상품명</div>
            <div class="value">
              <input class="input" type="text" placeholder="상품명" v-model="stepData[stepIndexName.step4].productName">
              <div class="sub-desc">∙ 상품명 또는 서비스명을 적어주세요.</div>
            </div>
          </div>
          <div class="input-box">
            <div class="key">광고 기간 </div>
            <div class="value">
              <common-calendar-inline :startDate="stepData[stepIndexName.step4].calendar.startDate" :endDate="stepData[stepIndexName.step4].calendar.endDate" :position="'right'"
                  @setFilterDate="setHistoryFilterDate" @openPopup="_openPopup" :detailMode="true" ref="commonCalendarInline"></common-calendar-inline>
            </div>
          </div>
          <div class="input-box">
            <div class="key">이미지 첨부 </div>
            <div class="value">
              <input-file @onChange="onChangePrevHistoryImage" :text="'파일 첨부'"
                :subDesc="'∙ 이미지 또는 이력 확인 가능한 파일을 업로드 해주세요.'" :multiple="true"
              ></input-file>
            </div>
          </div>
          <div class="input-box video">
            <div class="key">영상 첨부 </div>
            <div class="value">
              <input class="input" type="text" placeholder="영상링크 첨부" v-model="stepData[stepIndexName.step4].videoUrl">
              <div class="value"><input-file :multiple="true" @onChange="onChangePrevHistoryVideo" :text="'파일 첨부'"></input-file></div>
            </div>
          </div>
          <div class="file-size-limit help is-danger">∙ 파일첨부는 최대 20MB까지 첨부 가능합니다.</div>
        </div>
      </div>

      <div class="footer-btn-box">
        <button class="button light prev-btn" @click="prevStep">이전</button>
        <button class="button primary next-btn" @click="checkNextStep">{{ nextBtnText }}</button>
      </div>
    </div>
    <div class="finsh-page" v-else>
      <div class="img finsh-image"></div>
      <div class="title">광고판 등록이 완료되었습니다.</div>
      <div class="desc">
        <div>광고판 등록이 정상적으로 완료되었습니다.</div>
        <div>제출된 응답은 빌차에서 최종 검토 후 담당자에게 연락드립니다. </div>
      </div>
      <div class="btn-box">
        <button class="button light next-btn" @click="submitAnother">다른 응답 제출</button>
        <button class="button primary main-btn" @click="moveMainpage">메인페이지</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputFile from 'components/register/input-file'
import InputZipcode from 'components/register/input-zipcode'
import CommonCheckbox from 'components/common/common-checkbox'
import CommonCalendarInline from 'components/common/common-calendar-inline'
import CommonVaildator from 'components/common/common-vaildator'
import CommonSelect from 'components/common/common-select'
const stepStatusTitleArr = ['', '회사정보', '광고판 정보 ', '최저가 인증 계약서', '광고판 지난 이력']
export default {
  metaInfo () {
    return {
      title: '광고판 등록 | 빌차 | BILLCHA',
      htmlAttrs: {
        lang: 'ko-KR',
        dir: 'ltr'
      },
      meta: [
        { charset: 'utf-8' },
        {
          property: 'og:description',
          content: '원하시는 위치의 최적의 광고판을 찾아드립니다.',
          vmid: 'og:description'
        },
        {
          property: 'og:image ',
          content: window.location.origin + '/static/upload/images/email/header_logo.png',
          vmid: 'og:image'
        },
        {
          property: 'og:type',
          content: 'Website',
          vmid: 'og:type'
        },
        {
          property: 'og:sitename',
          content: '빌차 | BILLCHA',
          vmid: 'og:sitename'
        },
        {
          property: 'og:tag',
          content: '광고판, 매체, 인쇄물(종이 및 현수막), LED전광판',
          vmid: 'og:tag'
        },
        {
          property: 'og:cannonical',
          content: window.location.href,
          vmid: 'og:cannonical'
        },
        {
          property: 'og:url',
          content: window.location.href,
          vmid: 'og:url'
        },
        {
          property: 'og:twitter:card',
          content: 'summary_large_image',
          vmid: 'og:twitter:card'
        },
        {
          property: 'og:twitter:description',
          content: '원하시는 위치의 최적의 광고판을 찾아드립니다.',
          vmid: 'og:twitter:description'
        },
        {
          property: 'og:twitter:image',
          content: window.location.origin + '/static/upload/images/email/header_logo.png',
          vmid: 'og:twitter:image'
        },
        {
          property: 'og:facebook:description',
          content: '원하시는 위치의 최적의 광고판을 찾아드립니다.',
          vmid: 'og:facebook:description'
        },
        {
          property: 'og:facebook:image',
          content: window.location.origin + '/static/upload/images/email/header_logo.png',
          vmid: 'og:facebook:image'
        }
      ],
      script: [{
        vmid: 'ldjson-schema',
        innerHTML: `{
          "@context": "http://schema.org",
          "@type" : "WebSite",
          "name" : "빌차",
          "alternateName": "(주)빌차",
          "url": "` + window.location.origin + `"
          "description": "원하시는 위치의 최적의 광고판을 찾아드립니다."
        }`,
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        'ldjson-schema': ['innerHTML']
      }
    }
  },
  name: 'billboard-register-page',
  components: {
    InputFile,
    InputZipcode,
    CommonCheckbox,
    CommonCalendarInline,
    CommonVaildator,
    CommonSelect
  },
  data () {
    return {
      loading: false,
      localError: {
        // step2
        billBoardCategory: false,
        billBoardForm: false,
        designProductionCost: false,
        managementMonitoring: false,
        step2Calendar: false
      },
      step: 0,
      stepIndexName: {step1: 0, step2: 1, step3: 2, step4: 3, step5: 4},
      zipcodeSdk: null,
      stepData: [
        {
          companyName: '',
          companyRegistrationNumber: '',
          representativeName: '',
          copyCompanyRegistrationNumber: [],
          zipCode: {
            postcode: '',
            address: '',
            detailAddress: ''
          },
          personInCharge: {
            name: '',
            phoneNumber: '',
            email: ''
          }
        },
        {
          billBoardApproval: [],
          billBoardCategory: '옥상 간판',
          billBoardCategoryEtcValue: '',
          billBoardForm: 'LED',
          billBoardFormEtcValue: '',
          billBoardResoultion: '',
          billBoardPhotoFile: [],
          formData: {
            category: [
              { label: '옥상 간판', value: '옥상 간판' },
              { label: '공공시설물 이용 광고물', value: '공공시설물 이용 광고물' },
              { label: '현수막', value: '현수막' },
              { label: '선전탑', value: '선전탑' },
              { label: '아치광고물', value: '아치광고물' },
              { label: '기타', value: 'etc' }
            ],
            form: [
              { label: 'LED', value: 'LED' },
              { label: '현수막', value: '현수막' },
              { label: '인쇄물', value: '인쇄물' },
              { label: '기타', value: 'etc' }
            ],
            designProductionCost: [
              { label: '포함', value: '포함' },
              { label: '불포함', value: '불포함' },
              { label: '기타', value: 'etc' }
            ],
            managementMonitoring: [
              { label: '24시간 모니터링', value: '24시간 모니터링', check: true },
              { label: '주말', value: '주말', check: false },
              { label: '주 1회', value: '주 1회', check: false },
              { label: '주 2-3회', value: '주 2-3회', check: false },
              { label: '기타', value: 'etc', check: false }
            ]
          },
          actualSize: '',
          defaultZipCode: {
            postcode: '',
            address: '',
            detailAddress: ''
          },
          roadNameDirection: '',
          description: '',
          selectPeriodMinimum: {
            options: [{label: '일', value: '일'}, {label: '개월', value: '개월'}, {label: '년', value: '년'}],
            placeholder: '일',
            value: { label: '일', value: '일' }
          },
          calendar: {
            startDate: void 0,
            endDate: void 0,
            select: {
              options: [{label: '1개월', value: 1}, {label: '2개월', value: 2}, {label: '3개월', value: 3}],
              placeholder: '월 단위 선택'
            }
          },
          price: null,
          periodMinimum: null,
          installProductionCost: null,
          designProductionCost: '포함',
          designProductionCostEtcValue: '',
          managementMonitoring: '24시간 모니터링'
        },
        {
          lowestPriceVerificationFile: []
        },
        {
          advertiser: '',
          productName: '',
          image: null,
          video: null,
          videoUrl: null,
          calendar: {
            startDate: void 0,
            endDate: void 0,
            select: {
              options: [{label: '1개월', value: 1}, {label: '2개월', value: 2}, {label: '3개월', value: 3}],
              placeholder: '월 단위 선택'
            }
          }
        }
      ]
    }
  },
  computed: {
    getIsMobile () {
      return this.$store.getters.getIsMobile
    },
    stepStatusTitle () {
      return '0' + this.step + '.' + stepStatusTitleArr[this.step]
    },
    nextBtnText () {
      return this.step >= 4 ? '제출' : '다음'
    }
  },
  beforeMount () {
    this.$store.commit('setFooterShow', false)
  },
  mounted () {
    // this.sendEmail()
  },
  methods: {
    init () {
      this.loading = false
      this.step = 0
      this.stepIndexName = {step1: 0, step2: 1, step3: 2, step4: 3, step5: 4, step6: 5}
      this.stepData = [
        {
          companyName: '',
          companyRegistrationNumber: '',
          representativeName: '',
          copyCompanyRegistrationNumber: [],
          zipCode: {
            postcode: '',
            address: '',
            detailAddress: ''
          },
          personInCharge: {
            name: '',
            phoneNumber: '',
            email: ''
          }
        },
        {
          billBoardApproval: [],
          billBoardCategory: '옥상 간판',
          billBoardForm: 'LED',
          billBoardResoultion: '',
          billBoardPhotoFile: [],
          formData: {
            category: [
              { label: '옥상 간판', value: '옥상 간판' },
              { label: '공공시설물 이용 광고', value: '공공시설물 이용 광고물' },
              { label: '현수막', value: '현수막' },
              { label: '선전탑', value: '선전탑' },
              { label: '아치광고물', value: '아치광고물' },
              { label: '기타', value: 'etc' }
            ],
            form: [
              { label: 'LED', value: 'LED' },
              { label: '현수막', value: '현수막' },
              { label: '인쇄물', value: '인쇄물' },
              { label: '기타', value: 'etc' }
            ],
            designProductionCost: [
              { label: '포함', value: '포함' },
              { label: '불포함', value: '불포함' },
              { label: '기타', value: 'etc' }
            ],
            managementMonitoring: [
              { label: '24시간 모니터링', value: '24시간 모니터링', check: true },
              { label: '주말', value: '주말', check: false },
              { label: '주 1회', value: '주 1회', check: false },
              { label: '주 2-3회', value: '주 2-3회', check: false },
              { label: '기타', value: 'etc', check: false }
            ]
          },
          actualSize: '',
          defaultZipCode: {
            postcode: '',
            address: '',
            detailAddress: ''
          },
          roadNameDirection: '',
          description: '',
          selectPeriodMinimum: {
            options: [{label: '일', value: '일'}, {label: '월', value: '월'}, {label: '년', value: '년'}],
            placeholder: '일',
            value: {label: '일', value: '일'}
          },
          calendar: {
            startDate: void 0,
            endDate: void 0,
            select: {
              options: [{label: '1개월', value: 1}, {label: '2개월', value: 2}, {label: '3개월', value: 3}],
              placeholder: '월 단위 선택'
            }
          },
          price: null,
          periodMinimum: null,
          installProductionCost: null,
          designProductionCost: '포함',
          managementMonitoring: '24시간 모니터링',
          managementMonitoringEtcValue: ''
        },
        {
          lowestPriceVerificationFile: []
        },
        {
          advertiser: '',
          productName: '',
          image: null,
          video: null,
          videoUrl: null,
          calendar: {
            startDate: void 0,
            endDate: void 0,
            select: {
              options: [{label: '1개월', value: 1}, {label: '2개월', value: 2}, {label: '3개월', value: 3}],
              placeholder: '월 단위 선택'
            }
          }
        }
      ]
    },
    requestRegisterBillboardFormData () {
      let self = this
      let postData = this.parserFormData()
      this.$store.commit('setRootLoading', true)
      this.$axios({
        method: 'post',
        url: '/api/v1/register_billboard_form_data',
        data: postData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      }).then((resp) => {
        self.step = 5
        console.log(resp)
      }).catch(function (error) {
        console.log(error)
      }).then(() => {
        self.$store.commit('setRootLoading', false)
      })
    },
    parserFormData () {
      // 파일
      var copyCompanyRegistrationNumber = this.stepData[this.stepIndexName.step1].copyCompanyRegistrationNumber ? this.stepData[this.stepIndexName.step1].copyCompanyRegistrationNumber[0] : null
      var billBoardApproval = this.stepData[this.stepIndexName.step2].billBoardApproval ? this.stepData[this.stepIndexName.step2].billBoardApproval[0] : null
      var lowestPriceVerificationFile = this.stepData[this.stepIndexName.step3].lowestPriceVerificationFile ? this.stepData[this.stepIndexName.step3].lowestPriceVerificationFile[0] : null

      // 체크박스 라운드버튼
      var billBoardCategory = this.stepData[this.stepIndexName.step2].billBoardCategory === 'etc' ? this.stepData[this.stepIndexName.step2].billBoardCategoryEtcValue : this.stepData[this.stepIndexName.step2].billBoardCategory
      var billBoardForm = this.stepData[this.stepIndexName.step2].billBoardForm === 'etc' ? this.stepData[this.stepIndexName.step2].billBoardFormEtcValue : this.stepData[this.stepIndexName.step2].billBoardForm
      var designProductionCost = this.stepData[this.stepIndexName.step2].designProductionCost === 'etc' ? this.stepData[this.stepIndexName.step2].designProductionCostEtcValue : this.stepData[this.stepIndexName.step2].designProductionCost

      var bodyFormData = new FormData()
      bodyFormData.set('company_name', this.stepData[this.stepIndexName.step1].companyName)
      bodyFormData.set('company_post_code', this.stepData[this.stepIndexName.step1].zipCode.postcode)
      bodyFormData.set('company_address', this.stepData[this.stepIndexName.step1].zipCode.address)
      bodyFormData.set('company_detail_address', this.stepData[this.stepIndexName.step1].zipCode.detailAddress)
      bodyFormData.set('company_registration_number', this.stepData[this.stepIndexName.step1].companyRegistrationNumber)
      if (copyCompanyRegistrationNumber) bodyFormData.append('company_copy_of_registration_file', copyCompanyRegistrationNumber)
      bodyFormData.set('company_representative_name', this.stepData[this.stepIndexName.step1].representativeName)
      bodyFormData.set('company_person_in_charge_name', this.stepData[this.stepIndexName.step1].personInCharge.name)
      bodyFormData.set('company_person_in_charge_phone_number', this.stepData[this.stepIndexName.step1].personInCharge.phoneNumber)
      bodyFormData.set('company_person_in_charge_email', this.stepData[this.stepIndexName.step1].personInCharge.email)
      if (billBoardApproval) bodyFormData.append('billboard_approval_file', billBoardApproval)
      bodyFormData.set('billboard_category', billBoardCategory)
      bodyFormData.set('billboard_actual_size', this.stepData[this.stepIndexName.step2].actualSize)
      bodyFormData.set('billboard_form', billBoardForm)
      bodyFormData.set('billboard_resolution', this.exceptionBlankNull(this.stepData[this.stepIndexName.step2].billBoardResoultion))
      bodyFormData.set('billboard_post_code', this.stepData[this.stepIndexName.step2].defaultZipCode.postcode)
      bodyFormData.set('billboard_address', this.stepData[this.stepIndexName.step2].defaultZipCode.address)
      bodyFormData.set('billboard_detail_address', this.stepData[this.stepIndexName.step2].defaultZipCode.detailAddress)
      bodyFormData.set('billboard_road_name_direction', this.exceptionBlankNull(this.stepData[this.stepIndexName.step2].roadNameDirection))
      bodyFormData.set('billboard_description', this.exceptionBlankNull(this.stepData[this.stepIndexName.step2].description))
      bodyFormData.set('billboard_price', this.stepData[this.stepIndexName.step2].price)
      bodyFormData.set('billboard_min_ad_schedule', this.exceptionBlankNull(this.stepData[this.stepIndexName.step2].periodMinimum) + this.stepData[this.stepIndexName.step2].selectPeriodMinimum.value.value)
      bodyFormData.set('billboard_production_cost', this.stepData[this.stepIndexName.step2].installProductionCost)
      bodyFormData.set('billboard_design_production_cost_desc', designProductionCost)
      bodyFormData.set('billboard_management_monitoring_desc', this.stepData[this.stepIndexName.step2].managementMonitoring)
      bodyFormData.set('billboard_management_end_date', this.stepData[this.stepIndexName.step2].calendar.endDate)
      // 사진파일
      if (this.stepData[this.stepIndexName.step2].billBoardPhotoFile) {
        let files = this.stepData[this.stepIndexName.step2].billBoardPhotoFile
        for (let i = 0; i < files.length; i++) {
          bodyFormData.append('billboard_photo_file', files[i])
        }
      }
      if (lowestPriceVerificationFile) bodyFormData.append('billboard_lowest_price_verification_file', this.exceptionBlankNull(lowestPriceVerificationFile))
      bodyFormData.set('billboard_history_advertiser_name', this.exceptionBlankNull(this.stepData[this.stepIndexName.step4].advertiser))
      bodyFormData.set('billboard_history_ad_product_name', this.exceptionBlankNull(this.stepData[this.stepIndexName.step4].productName))
      bodyFormData.set('billboard_history_ad_start_date', this.exceptionBlankNull(this.stepData[this.stepIndexName.step4].calendar.startDate))
      bodyFormData.set('billboard_history_ad_end_date', this.exceptionBlankNull(this.stepData[this.stepIndexName.step4].calendar.endDate))
      // 지난이력 이미지파일
      if (this.stepData[this.stepIndexName.step4].image) {
        let imageFiles = this.stepData[this.stepIndexName.step4].image
        for (let i = 0; i < imageFiles.length; i++) {
          bodyFormData.append('billboard_history_ad_related_file', imageFiles[i])
        }
      }
      // 영상 URL
      // bodyFormData.set('videoURL', this.exceptionBlankNull(this.stepData[this.stepIndexName.step4].videoUrl))

      // 지난이력 영상파일
      if (this.stepData[this.stepIndexName.step4].video) {
        let videoFiles = this.stepData[this.stepIndexName.step4].video
        for (let i = 0; i < videoFiles.length; i++) {
          bodyFormData.append('billboard_video_file', videoFiles[i])
        }
      }

      return bodyFormData
    },
    exceptionBlankNull (value) {
      if (!value || value === '') return '-'
      else return value
    },
    _onChangePeriodMinimumValue (value) {
      this.stepData[this.stepIndexName.step2].selectPeriodMinimum.value = value
    },
    onInput () {
      console.log(this.fields.companyName)
      // this.localError.apiError = false
    },
    onChangeCopyCompanyRegistrationNumber (data) {
      this.stepData[this.stepIndexName.step1].copyCompanyRegistrationNumber = data
      console.log(data)
    },
    changeZipcodeStep1 (data) {
      this.stepData[this.stepIndexName.step1].zipCode.postcode = data.postcode
      this.stepData[this.stepIndexName.step1].zipCode.address = data.address
      this.stepData[this.stepIndexName.step1].zipCode.detailAddress = data.detailAddress
    },
    onChangeBillBoardApproval (data) {
      this.stepData[this.stepIndexName.step2].billBoardApproval = data
    },
    onChangeBillBoardPhotoFile (data) {
      this.stepData[this.stepIndexName.step2].billBoardPhotoFile = data
    },
    changedDefaultZipCodeStep2 (data) {
      this.stepData[this.stepIndexName.step2].defaultZipCode.postcode = data.postcode
      this.stepData[this.stepIndexName.step2].defaultZipCode.address = data.address
      this.stepData[this.stepIndexName.step2].defaultZipCode.detailAddress = data.detailAddress
    },
    onChangeLowestPriceVerification (data) {
      this.stepData[this.stepIndexName.step3].lowestPriceVerificationFile = data
    },
    onChangeManagementMonitoring (data) {
      this.stepData[this.stepIndexName.step2].formData.managementMonitoring[data.index].check = data.check
      this.parsingManagementMonitoringCheckBoxData()
    },
    parsingManagementMonitoringCheckBoxData () {
      var result = []
      let max = this.stepData[this.stepIndexName.step2].formData.managementMonitoring.length
      for (let i = 0; i < max; i++) {
        let item = this.stepData[this.stepIndexName.step2].formData.managementMonitoring[i]
        if (item.check) {
          if (item.value === 'etc') result.push(this.stepData[this.stepIndexName.step2].managementMonitoringEtcValue)
          else result.push(item.value)
        }
      }
      if (result.length > 0) this.stepData[this.stepIndexName.step2].managementMonitoring = result.join()
      else this.stepData[this.stepIndexName.step2].formData.managementMonitoring = ''
    },
    setFilterDate (date) {
      this.stepData[this.stepIndexName.step2].calendar.startDate = date.start
      this.stepData[this.stepIndexName.step2].calendar.endDate = date.end
      this.stepData[this.stepIndexName.step2].calendar.count = date.count
      this.localError.step2Calendar = false
    },
    _unlockBody () {
      this.$nextTick(() => {
        document.body.style.height = '100%'
        document.body.style.overflow = ''
      })
    },
    _openPopup () {
      this._unlockBody()
    },
    onChangePrevHistoryImage (data) {
      this.stepData[this.stepIndexName.step4].image = data
    },
    onChangePrevHistoryVideo (data) {
      this.stepData[this.stepIndexName.step4].video = data
    },
    setHistoryFilterDate (date) {
      this.stepData[this.stepIndexName.step4].calendar.startDate = date.start
      this.stepData[this.stepIndexName.step4].calendar.endDate = date.end
      this.stepData[this.stepIndexName.step4].calendar.count = date.count
    },
    prevStep () {
      if (this.step !== 1) {
        this.step--
      }
    },
    checkNextStep () {
      if (this.step === 1) {
        if (
          this.stepData[this.stepIndexName.step1].companyName !== '' &&
          this.stepData[this.stepIndexName.step1].companyRegistrationNumber !== '' &&
          this.stepData[this.stepIndexName.step1].representativeName !== '' &&
          this.stepData[this.stepIndexName.step1].copyCompanyRegistrationNumber.length > 0 &&
          this.stepData[this.stepIndexName.step1].zipCode.postcode !== '' &&
          this.stepData[this.stepIndexName.step1].zipCode.address !== '' &&
          this.stepData[this.stepIndexName.step1].zipCode.detailAddress !== '' &&
          this.stepData[this.stepIndexName.step1].personInCharge.name !== '' &&
          this.stepData[this.stepIndexName.step1].personInCharge.phoneNumber !== '' &&
          this.stepData[this.stepIndexName.step1].personInCharge.email !== ''
        ) {
          this.step = 2
        } else {
          this.$refs.companyName.validatorAll()
          this.$refs.companyRegistrationNumber.validatorAll()
          this.$refs.representativeName.validatorAll()
          this.$refs.copyCompanyRegistrationNumber.validatorAll()
          this.$refs.zipCode.validatorAll()
          this.$refs.personInChargeName.validatorAll()
          this.$refs.personInChargePhoneNumber.validatorAll()
          this.$refs.personInChargeEmail.validatorAll()
        }
      } else if (this.step === 2) {
        if (
          this.stepData[this.stepIndexName.step2].billBoardApproval.length > 0 &&
          this.stepData[this.stepIndexName.step2].billBoardCategory !== '' &&
          this.stepData[this.stepIndexName.step2].actualSize !== '' &&
          this.stepData[this.stepIndexName.step2].billBoardForm !== '' &&
          this.stepData[this.stepIndexName.step2].defaultZipCode.postcode !== '' &&
          this.stepData[this.stepIndexName.step2].defaultZipCode.address !== '' &&
          this.stepData[this.stepIndexName.step2].defaultZipCode.detailAddress !== '' &&
          this.stepData[this.stepIndexName.step2].price !== null &&
          this.stepData[this.stepIndexName.step2].installProductionCost !== null &&
          this.stepData[this.stepIndexName.step2].designProductionCost !== '' &&
          this.stepData[this.stepIndexName.step2].managementMonitoring !== '' &&
          this.stepData[this.stepIndexName.step2].calendar.startDate !== void 0 &&
          this.stepData[this.stepIndexName.step2].calendar.endDate !== void 0 &&
          this.stepData[this.stepIndexName.step2].billBoardPhotoFile.length > 0
        ) {
          this.step = 3
        } else {
          this.$refs.billBoardApproval.validatorAll()
          if (this.stepData[this.stepIndexName.step2].billBoardCategory === '') {
            this.localError.billBoardCategory = true
          } else {
            this.localError.billBoardCategory = false
          }
          this.$refs.actualSize.validatorAll()
          if (this.stepData[this.stepIndexName.step2].billBoardForm === '') {
            this.localError.billBoardForm = true
          } else {
            this.localError.billBoardForm = false
          }
          this.$refs.defaultZipCode.validatorAll()
          this.$refs.price.validatorAll()
          this.$refs.installProductionCost.validatorAll()
          if (this.stepData[this.stepIndexName.step2].designProductionCost === '') {
            this.localError.designProductionCost = true
          } else {
            this.localError.designProductionCost = false
          }
          if (this.stepData[this.stepIndexName.step2].managementMonitoring === '') {
            this.localError.managementMonitoring = true
          } else {
            this.localError.managementMonitoring = false
          }
          if (this.stepData[this.stepIndexName.step2].calendar.startDate === void 0 || this.stepData[this.stepIndexName.step2].calendar.endDate === void 0) {
            this.localError.step2Calendar = true
          } else {
            this.localError.step2Calendar = false
          }
          this.$refs.billBoardPhotoFile.validatorAll()
        }
      } else if (this.step === 3) {
        this.step = 4
      } else if (this.step === 4) {
        this.requestRegisterBillboardFormData()
      }
    },
    startRegisterBillboard () {
      this.step = 1
    },
    sendEmail () {
    },
    routerMove (path) {
      this.$router.push(path)
    },
    submitAnother () {
      this.init()
    },
    moveMainpage () {
      this.$router.push('/')
    },
    newline () {
      if (!this.step === 2) return
      switch (event.srcKey) {
        case 'enter':
          this.stepData[this.stepIndexName.step2].description = `${this.stepData[this.stepIndexName.step2].description}\n`
          break
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
<style lang="stylus">
.mobile
  .billboard-register-page.wrapper
    width 100%
    // select 예외처리
    .multiselect {
      height: 50px;
    }
    .multiselect__single {
      line-height: 50px;
      height: 48px;
    }
    .multiselect__tags {
      height: 50px;
      border: solid 1px rgba(22, 27, 72, 0.2);
    }
    .multiselect__select {
      height: 50px;
    }
    .multiselect__option {
      min-height: 3rem;
      padding: 1rem;
    }
    .multiselect__placeholder {
      opacity: 0.4;
      line-height: 50px;
    }
    .common-calendar-inline-wrapper .common-context-btn .filter-input
      height 50px
      width 280px
    .help.is-danger,
    .sub-desc
      font-size 12px
    .start-page
      width 100%
      .register-image
        margin 0
      .title
        margin-top 11px
        font-size 20px
        margin-bottom 25px
      .desc
        text-align center
        font-size 12px
        font-weight 300
        .sub
          font-size 12px
      .next-btn
        bottom 0
        width 100%
        position fixed
        font-size 16px
        font-weight normal
    .step-container
      width 100%
      .step-status
        flex 0 0 64px
        .title
          padding 0px 15px
          margin-top 12px
          height 37px
          line-height 48px
          order 1
          color #162348
          font-size 16px
          font-weight 500
          box-sizing border-box
          margin-bottom 0px
        .line
          order 0
        .sub-title
          order 2
          padding 0px 15px
          height 20px
          line-height 20px
          font-size 12px
          font-weight 300
      .step-inner
        padding 0 15px
        box-sizing border-box
        min-height calc(100vh - 277px)
        .input-box
          flex-direction column
          margin-bottom 16px
          &.address
            height auto
          &.radio
            height auto
          &.textarea-box
            height auto
          .textarea
            flex 0 0 155px
            height 155px
          .key
            flex 0 0 24px
            margin 0 0 8px 0
            line-height 24px
            font-size 14px
          .value
            flex 1 0 50px
        .input-box.radio
          &.design-production-cost, &.management-monitoring
            .col-6.etc
              width 100%
              float none
              display flex
              flex-direction row
              > .input
                flex 0 1 161px
        .radio-box
          .etc
            display flex
            flex-direction column
            .radio-container
              float none
              clear both
             > .input
              width 100%
              margin 0
        .file-size-limit
          margin-left 0px
      > .footer-btn-box
        justify-content flex-end
        align-items flex-end
        flex 0 0 60px
        .button
          margin 0
          width 50%
          font-size 16px
          font-weight normal
    .finsh-page
      width 100%
      flex 1
      padding-bottom 60px
      .finsh-image
        margin 0
      .title
        margin 55px 0px 25px 0px
        font-size 20px
        font-weight normal
      .desc
        margin 0px
        font-size 14px
        font-weight normal
        text-align center
      .btn-box
        // justify-content flex-end
        // align-items flex-end
        // flex 0 0 60px
        position fixed
        bottom 0px
        width 100%
        .button
          margin 0
          width 50%
          font-size 16px
          font-weight normal
.billboard-register-page.wrapper
  .common-calendar-inline-wrapper
    .common-context-popup-wrapper
      height 50px
    .filter-input
      height 100%
  // validator
  .help.is-danger, .sub-desc
    line-height 24px
    font-size 14px
    font-weight 300
    margin-top 0
    margin-left 8px
  .start-page
    width 460px
    display flex
    flex-direction column
    .register-image
      width 100%
      height 121px
      background-image url('~assets/images/billboard_register.png')
      margin-bottom 41px
    .title
      font-size 24px
      font-weight normal
      text-align center
      margin-bottom 21px
    .desc
      font-size 16px
      font-weight 300
      line-height 1.7
      margin-bottom 53px
      .emphasis
        font-weight 500
        text-decoration underline
      .sub
        padding-left 20px
        font-size 14px
    .next-btn
      width 272px
      height 70px
      border-radius 4px
  .step-container
    width 780px
    display flex
    flex-direction column
    .step-status
      width 100%
      display flex
      flex 0 0 129px
      flex-direction column
      justify-content center
      .title
        font-size 16px
        font-weight 300
        height 24px
        line-height 24px
        margin-bottom 11px
      .sub-title
        font-size 14px
        font-weight 300
        height 24px
        line-height 24px
      .line
        width 100%
        height 5px
        border-radius 1px
        background-color #ececf4
        .active
          height 100%
          border-radius 1px
          background-color #080f31
    .step-inner
      // flex 1 0 547px
      flex 0 1 auto
      margin-top 29px
      min-height 500px
      .input-box
        display flex
        min-height 50px
        line-height 50px
        height auto
        .key
          flex 0 0 140px
          margin-right 60px
        .value
          flex 1 0 140px
          height 100%
          // margin-left 60px
          >.input
            height 50px
        .textarea
          flex 0 0 190px
          height 190px
        > .button
          height 50px
          font-size 16px
          color rgba(22, 35, 72, 0.4)
          font-weight 300
          border-radius: 2px
          box-shadow: 0 2px 6px 2px rgba(22, 27, 72, 0.03)
          border: solid 1px rgba(22, 27, 72, 0.2)
          background-color: #ffffff
        &.address
          height 178px
        &.radio
          height 120px
        &.textarea-box
          height 234px
        &.video
          height auto
          margin-bottom 0px
          .input
            margin-bottom 10px
        &.period-minimum
          .value
            .period-minimum-box
              display flex
            .input
              width 133px
              height 50px
              margin-right 14px
            .select-box
              width 133px
      .radio-box
        height auto
        .key
          width 140px
        > .etc
          .radio-container, .checkbox
            width 70px
            float left
          > .input
            width calc(100% - 97px)
            margin-left 27px
            cursor text
            &:disabled
              cursor not-allowed
      .file-size-limit
        margin-top 1px
        margin-left 208px
    > .footer-btn-box
      width 100%
      flex 0 0 191px
      justify-content center
      align-items center
      display flex
      margin-top 54px
      .button
        height 70px
        width calc(50% - 12px)
      .prev-btn
        margin-right 10px
      .next-btn
        margin-left 10px
  .finsh-page
    width 460px
    display flex
    flex-direction column
    .finsh-image
      width 100%
      height 60px
      background-image url('~assets/images/ic/ic_send_email_complete.png')
      margin-bottom 52px
    .title
      font-size 28px
      font-weight normal
      text-align center
      margin-bottom 9.8px
    .desc
      font-size 16px
      font-weight 300
      line-height 1.7
      margin-bottom 70px
      text-align center
    .button
      height 70px
      width calc(50% - 10px)
      float left
      &.next-btn
        margin-right 10px
      &.main-btn
        margin-left 10px
</style>
