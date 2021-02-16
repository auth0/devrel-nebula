import React from 'react'

interface BrandingProps {
  width?: number
  height?: number
  style?: React.CSSProperties
}

const Branding: React.FC<BrandingProps> = ({
  width = 253,
  height = 89,
  style,
}) => (
  <svg
    width={width}
    height={height}
    style={style}
    viewBox="0 0 253 89"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.4841 9.81818L24.0338 26.7443V36H29.531V26.7443L39.0807 9.81818H32.8804L26.9103 21.0938H26.6546L20.6844 9.81818H14.4841ZM47.2326 36.3835C52.0906 36.3835 55.3633 34.0185 56.1304 30.375L51.0934 30.0426C50.5437 31.5384 49.1375 32.3182 47.3221 32.3182C44.5991 32.3182 42.8733 30.5156 42.8733 27.5881V27.5753H56.2454V26.0795C56.2454 19.4062 52.2056 16.108 47.0153 16.108C41.2369 16.108 37.4911 20.2116 37.4911 26.2713C37.4911 32.4972 41.1858 36.3835 47.2326 36.3835ZM42.8733 24.2003C42.9883 21.9631 44.6886 20.1733 47.1048 20.1733C49.4698 20.1733 51.1062 21.8608 51.119 24.2003H42.8733ZM65.7588 36.3707C68.6608 36.3707 70.5401 35.1051 71.4989 33.277H71.6523V36H76.8171V22.7557C76.8171 18.0767 72.854 16.108 68.4818 16.108C63.7773 16.108 60.6835 18.358 59.9293 21.9375L64.9662 22.3466C65.3369 21.0426 66.5003 20.0838 68.4563 20.0838C70.31 20.0838 71.371 21.017 71.371 22.6278V22.7045C71.371 23.9702 70.0287 24.1364 66.6154 24.4688C62.729 24.8267 59.2389 26.1307 59.2389 30.5156C59.2389 34.402 62.0131 36.3707 65.7588 36.3707ZM67.3185 32.6122C65.6438 32.6122 64.4421 31.8324 64.4421 30.3366C64.4421 28.8026 65.7077 28.0483 67.6253 27.7798C68.8142 27.6136 70.7574 27.3324 71.4094 26.8977V28.9815C71.4094 31.0398 69.7091 32.6122 67.3185 32.6122ZM81.4022 36H86.8482V24.8906C86.8482 22.4744 88.6124 20.8125 91.0158 20.8125C91.7701 20.8125 92.8056 20.9403 93.317 21.1065V16.2741C92.8312 16.1591 92.1536 16.0824 91.6039 16.0824C89.405 16.0824 87.6025 17.3608 86.8866 19.7898H86.682V16.3636H81.4022V36ZM105.185 36H110.631V16.3636H105.185V36ZM107.92 13.8324C109.544 13.8324 110.874 12.5923 110.874 11.071C110.874 9.5625 109.544 8.32244 107.92 8.32244C106.31 8.32244 104.98 9.5625 104.98 11.071C104.98 12.5923 106.31 13.8324 107.92 13.8324ZM120.799 24.6477C120.812 22.1165 122.321 20.6335 124.519 20.6335C126.706 20.6335 128.022 22.0653 128.01 24.4688V36H133.456V23.4972C133.456 18.9205 130.771 16.108 126.68 16.108C123.765 16.108 121.656 17.5398 120.774 19.8281H120.544V16.3636H115.353V36H120.799V24.6477ZM170.003 18.9844C169.274 12.9375 164.698 9.46023 158.638 9.46023C151.722 9.46023 146.442 14.3438 146.442 22.9091C146.442 31.4489 151.632 36.358 158.638 36.358C165.35 36.358 169.402 31.8963 170.003 27.0767L164.404 27.0511C163.879 29.8509 161.681 31.4616 158.727 31.4616C154.752 31.4616 152.054 28.5085 152.054 22.9091C152.054 17.4631 154.713 14.3565 158.766 14.3565C161.796 14.3565 163.982 16.108 164.404 18.9844H170.003ZM183.102 36.3835C189.06 36.3835 192.767 32.3054 192.767 26.2585C192.767 20.1733 189.06 16.108 183.102 16.108C177.145 16.108 173.438 20.1733 173.438 26.2585C173.438 32.3054 177.145 36.3835 183.102 36.3835ZM183.128 32.1648C180.379 32.1648 178.973 29.6463 178.973 26.2202C178.973 22.794 180.379 20.2628 183.128 20.2628C185.825 20.2628 187.232 22.794 187.232 26.2202C187.232 29.6463 185.825 32.1648 183.128 32.1648ZM203.904 36.3196C207.075 36.3196 208.724 34.4915 209.478 32.8551H209.708V36H215.077V9.81818H209.644V19.6619H209.478C208.749 18.0639 207.177 16.108 203.891 16.108C199.583 16.108 195.94 19.4574 195.94 26.2074C195.94 32.7784 199.43 36.3196 203.904 36.3196ZM205.63 31.9858C202.958 31.9858 201.501 29.608 201.501 26.1818C201.501 22.7812 202.932 20.4418 205.63 20.4418C208.276 20.4418 209.759 22.679 209.759 26.1818C209.759 29.6847 208.251 31.9858 205.63 31.9858ZM228.864 36.3835C233.722 36.3835 236.995 34.0185 237.762 30.375L232.725 30.0426C232.175 31.5384 230.769 32.3182 228.953 32.3182C226.23 32.3182 224.505 30.5156 224.505 27.5881V27.5753H237.877V26.0795C237.877 19.4062 233.837 16.108 228.647 16.108C222.868 16.108 219.122 20.2116 219.122 26.2713C219.122 32.4972 222.817 36.3835 228.864 36.3835ZM224.505 24.2003C224.62 21.9631 226.32 20.1733 228.736 20.1733C231.101 20.1733 232.737 21.8608 232.75 24.2003H224.505Z"
      fill="white"
    />
    <path
      d="M9.8584 84.4688H11.8457V78.8828C11.9889 79.0404 12.1429 79.1872 12.3076 79.3232C12.4723 79.4521 12.6478 79.5703 12.834 79.6777C13.1419 79.8496 13.4857 79.9821 13.8652 80.0752C14.252 80.1683 14.6673 80.2148 15.1113 80.2148C15.8418 80.2148 16.4899 80.0645 17.0557 79.7637C17.6286 79.4629 18.1084 79.0475 18.4951 78.5176C18.8818 77.9876 19.1755 77.3646 19.376 76.6484C19.5765 75.9251 19.6768 75.1481 19.6768 74.3174V74.0918C19.6768 73.2253 19.5765 72.4303 19.376 71.707C19.1755 70.9766 18.8818 70.3499 18.4951 69.8271C18.1084 69.3044 17.6286 68.8962 17.0557 68.6025C16.4827 68.3089 15.8239 68.1621 15.0791 68.1621C14.6566 68.1621 14.2591 68.2087 13.8867 68.3018C13.5215 68.3877 13.1885 68.5166 12.8877 68.6885C12.6729 68.8031 12.4723 68.9427 12.2861 69.1074C12.0999 69.265 11.9281 69.444 11.7705 69.6445L11.6738 68.377H9.8584V84.4688ZM17.6895 74.0918V74.3174C17.6895 74.8831 17.625 75.4238 17.4961 75.9395C17.3743 76.4551 17.1846 76.9098 16.9268 77.3037C16.6689 77.6976 16.3395 78.0127 15.9385 78.249C15.5374 78.4782 15.0612 78.5928 14.5098 78.5928C14.166 78.5928 13.8509 78.5498 13.5645 78.4639C13.2852 78.3779 13.0309 78.2598 12.8018 78.1094C12.6012 77.9805 12.4222 77.8229 12.2646 77.6367C12.1071 77.4505 11.9674 77.25 11.8457 77.0352V71.4385C11.9818 71.195 12.1393 70.973 12.3184 70.7725C12.4974 70.5719 12.7015 70.4036 12.9307 70.2676C13.1383 70.1315 13.3711 70.0277 13.6289 69.9561C13.8939 69.8844 14.1803 69.8486 14.4883 69.8486C15.0469 69.8486 15.5267 69.9632 15.9277 70.1924C16.3288 70.4215 16.6618 70.7295 16.9268 71.1162C17.1846 71.5101 17.3743 71.9648 17.4961 72.4805C17.625 72.9889 17.6895 73.526 17.6895 74.0918ZM22.6059 74.0811V74.3174C22.6059 75.1553 22.7277 75.9323 22.9712 76.6484C23.2147 77.3646 23.5656 77.9876 24.0239 78.5176C24.4751 79.0475 25.0265 79.4629 25.6782 79.7637C26.3371 80.0645 27.0783 80.2148 27.9018 80.2148C28.7182 80.2148 29.4523 80.0645 30.104 79.7637C30.7557 79.4629 31.3107 79.0475 31.769 78.5176C32.2202 77.9876 32.5675 77.3646 32.811 76.6484C33.0545 75.9323 33.1763 75.1553 33.1763 74.3174V74.0811C33.1763 73.2432 33.0545 72.4661 32.811 71.75C32.5675 71.0267 32.2202 70.4001 31.769 69.8701C31.3107 69.3402 30.7521 68.9248 30.0932 68.624C29.4415 68.3161 28.7039 68.1621 27.8804 68.1621C27.0639 68.1621 26.3299 68.3161 25.6782 68.624C25.0265 68.9248 24.4751 69.3402 24.0239 69.8701C23.5656 70.4001 23.2147 71.0267 22.9712 71.75C22.7277 72.4661 22.6059 73.2432 22.6059 74.0811ZM24.5932 74.3174V74.0811C24.5932 73.5153 24.6613 72.9746 24.7973 72.459C24.9334 71.9362 25.1411 71.4779 25.4204 71.084C25.6925 70.6901 26.0327 70.3786 26.4409 70.1494C26.8491 69.9131 27.3289 69.7949 27.8804 69.7949C28.4318 69.7949 28.9116 69.9131 29.3198 70.1494C29.7352 70.3786 30.0825 70.6901 30.3618 71.084C30.6339 71.4779 30.838 71.9362 30.9741 72.459C31.1173 72.9746 31.1889 73.5153 31.1889 74.0811V74.3174C31.1889 74.8903 31.1209 75.4382 30.9848 75.9609C30.8488 76.4766 30.6447 76.9313 30.3725 77.3252C30.0932 77.7191 29.7459 78.0306 29.3305 78.2598C28.9223 78.4889 28.4461 78.6035 27.9018 78.6035C27.3504 78.6035 26.867 78.4889 26.4516 78.2598C26.0363 78.0306 25.6925 77.7191 25.4204 77.3252C25.1411 76.9313 24.9334 76.4766 24.7973 75.9609C24.6613 75.4382 24.5932 74.8903 24.5932 74.3174ZM37.5771 80H39.1455L40.9394 72.8779L41.2295 71.0732L41.5302 72.8779L43.3457 80H44.914L47.3847 68.377H45.623L44.3339 75.7891L44.0439 77.6152L43.7324 75.7891L41.8847 68.377H40.6064L38.748 75.7891L38.458 77.4541L38.2216 75.7891L36.8681 68.377H35.1064L37.5771 80ZM54.8901 80.2148C56.0216 80.2148 56.9705 79.9893 57.7368 79.5381C58.5102 79.0798 59.0903 78.557 59.477 77.9697L58.2631 77.0244C57.8979 77.4971 57.4396 77.8766 56.8881 78.1631C56.3367 78.4495 55.7065 78.5928 54.9975 78.5928C54.4604 78.5928 53.9698 78.4925 53.5258 78.292C53.0818 78.0915 52.7023 77.8158 52.3871 77.4648C52.0792 77.1354 51.8357 76.7559 51.6567 76.3262C51.4848 75.8965 51.3738 75.3988 51.3237 74.833V74.7578H59.6274V73.8662C59.6274 73.057 59.5235 72.305 59.3159 71.6104C59.1153 70.9157 58.8074 70.3105 58.392 69.7949C57.9767 69.2865 57.4539 68.889 56.8237 68.6025C56.2006 68.3089 55.4702 68.1621 54.6323 68.1621C53.9663 68.1621 53.3146 68.2982 52.6772 68.5703C52.047 68.8424 51.4848 69.2327 50.9907 69.7412C50.4894 70.2568 50.0883 70.887 49.7875 71.6318C49.4868 72.3695 49.3364 73.2074 49.3364 74.1455V74.5967C49.3364 75.4059 49.4724 76.1543 49.7446 76.8418C50.0167 77.5293 50.3963 78.1237 50.8832 78.625C51.3702 79.1263 51.9539 79.5166 52.6342 79.7959C53.3217 80.0752 54.0737 80.2148 54.8901 80.2148ZM54.6323 69.7949C55.1407 69.7949 55.5776 69.888 55.9428 70.0742C56.3152 70.2604 56.6232 70.5039 56.8666 70.8047C57.1101 71.1055 57.2999 71.4635 57.436 71.8789C57.572 72.2871 57.6401 72.6702 57.6401 73.0283V73.125H51.3881C51.4669 72.5879 51.603 72.1152 51.7963 71.707C51.9969 71.2917 52.2403 70.9408 52.5268 70.6543C52.8133 70.375 53.1355 70.1637 53.4936 70.0205C53.8517 69.8701 54.2312 69.7949 54.6323 69.7949ZM70.6669 68.1621C69.8219 68.1621 69.0663 68.3483 68.4003 68.7207C67.7415 69.0859 67.1757 69.5872 66.703 70.2246L66.6923 69.9346L66.6064 68.377H64.7157V80H66.7138V72.5449C66.8427 72.1868 67.0038 71.8646 67.1972 71.5781C67.3977 71.2845 67.6305 71.0374 67.8954 70.8369C68.1891 70.6077 68.5328 70.4359 68.9267 70.3213C69.3206 70.1995 69.761 70.1387 70.248 70.1387C70.6275 70.1387 70.9892 70.1602 71.3329 70.2031C71.6838 70.2389 72.0527 70.2998 72.4394 70.3857L72.7079 68.4414C72.5074 68.3555 72.2066 68.2874 71.8056 68.2373C71.4117 68.1872 71.0322 68.1621 70.6669 68.1621ZM81.4809 80.2148C82.6124 80.2148 83.5613 79.9893 84.3275 79.5381C85.101 79.0798 85.6811 78.557 86.0678 77.9697L84.8539 77.0244C84.4887 77.4971 84.0303 77.8766 83.4789 78.1631C82.9275 78.4495 82.2973 78.5928 81.5883 78.5928C81.0512 78.5928 80.5606 78.4925 80.1166 78.292C79.6726 78.0915 79.293 77.8158 78.9779 77.4648C78.67 77.1354 78.4265 76.7559 78.2475 76.3262C78.0756 75.8965 77.9646 75.3988 77.9145 74.833V74.7578H86.2182V73.8662C86.2182 73.057 86.1143 72.305 85.9066 71.6104C85.7061 70.9157 85.3982 70.3105 84.9828 69.7949C84.5674 69.2865 84.0447 68.889 83.4145 68.6025C82.7914 68.3089 82.0609 68.1621 81.223 68.1621C80.557 68.1621 79.9053 68.2982 79.268 68.5703C78.6378 68.8424 78.0756 69.2327 77.5814 69.7412C77.0801 70.2568 76.6791 70.887 76.3783 71.6318C76.0775 72.3695 75.9271 73.2074 75.9271 74.1455V74.5967C75.9271 75.4059 76.0632 76.1543 76.3354 76.8418C76.6075 77.5293 76.987 78.1237 77.474 78.625C77.961 79.1263 78.5447 79.5166 79.225 79.7959C79.9125 80.0752 80.6645 80.2148 81.4809 80.2148ZM81.223 69.7949C81.7315 69.7949 82.1684 69.888 82.5336 70.0742C82.906 70.2604 83.2139 70.5039 83.4574 70.8047C83.7009 71.1055 83.8907 71.4635 84.0268 71.8789C84.1628 72.2871 84.2309 72.6702 84.2309 73.0283V73.125H77.9789C78.0577 72.5879 78.1937 72.1152 78.3871 71.707C78.5876 71.2917 78.8311 70.9408 79.1176 70.6543C79.404 70.375 79.7263 70.1637 80.0844 70.0205C80.4424 69.8701 80.822 69.7949 81.223 69.7949ZM89.2655 74.0918V74.3174C89.2655 75.1481 89.3765 75.9251 89.5985 76.6484C89.8205 77.3646 90.132 77.9876 90.5331 78.5176C90.9341 79.0475 91.4175 79.4629 91.9833 79.7637C92.5562 80.0645 93.1936 80.2148 93.8954 80.2148C94.6115 80.2148 95.2382 80.0931 95.7753 79.8496C96.3124 79.6061 96.7743 79.248 97.161 78.7754L97.247 80H99.0731V63.5H97.0858V69.5264C96.7063 69.0824 96.2551 68.7458 95.7323 68.5166C95.2167 68.2803 94.6115 68.1621 93.9169 68.1621C93.2079 68.1621 92.5669 68.3089 91.994 68.6025C91.4211 68.8962 90.9341 69.3044 90.5331 69.8271C90.1249 70.3499 89.8098 70.9766 89.5878 71.707C89.3729 72.4303 89.2655 73.2253 89.2655 74.0918ZM91.2528 74.3174V74.0918C91.2528 73.526 91.3137 72.9889 91.4354 72.4805C91.5572 71.9648 91.747 71.5101 92.0048 71.1162C92.2554 70.7295 92.5777 70.4215 92.9716 70.1924C93.3726 69.9632 93.8524 69.8486 94.411 69.8486C95.0627 69.8486 95.607 70.0026 96.0438 70.3105C96.4807 70.6113 96.828 70.998 97.0858 71.4707V76.8633C96.828 77.3717 96.4807 77.7764 96.0438 78.0771C95.607 78.3779 95.0555 78.5283 94.3895 78.5283C93.8381 78.5283 93.3654 78.4173 92.9716 78.1953C92.5777 77.9661 92.2554 77.6582 92.0048 77.2715C91.747 76.8848 91.5572 76.4372 91.4354 75.9287C91.3137 75.4202 91.2528 74.8831 91.2528 74.3174ZM126.083 74.3174V74.0918C126.083 73.4831 126.033 72.9066 125.932 72.3623C125.832 71.8109 125.685 71.3096 125.492 70.8584C125.306 70.4574 125.091 70.0957 124.848 69.7734C124.604 69.444 124.328 69.1647 124.02 68.9355C123.677 68.6921 123.293 68.5023 122.871 68.3662C122.448 68.2301 121.987 68.1621 121.485 68.1621C121.084 68.1621 120.712 68.2015 120.368 68.2803C120.024 68.359 119.709 68.4736 119.423 68.624C119.194 68.7458 118.979 68.8926 118.778 69.0645C118.578 69.2292 118.395 69.4154 118.23 69.623V63.5H116.243V80H118.069L118.166 78.6787C118.295 78.8434 118.431 78.9938 118.574 79.1299C118.717 79.266 118.868 79.3913 119.025 79.5059C119.355 79.735 119.723 79.9105 120.132 80.0322C120.547 80.154 121.005 80.2148 121.507 80.2148C121.944 80.2148 122.348 80.1611 122.721 80.0537C123.1 79.9463 123.447 79.7959 123.763 79.6025C124.199 79.3232 124.572 78.9723 124.88 78.5498C125.195 78.1201 125.449 77.6367 125.642 77.0996C125.786 76.6914 125.893 76.2546 125.965 75.7891C126.043 75.3164 126.083 74.8258 126.083 74.3174ZM124.096 74.0918V74.3174C124.096 74.6611 124.074 74.9977 124.031 75.3271C123.988 75.6566 123.92 75.9645 123.827 76.251C123.712 76.6305 123.558 76.9743 123.365 77.2822C123.172 77.5902 122.932 77.8444 122.645 78.0449C122.431 78.2025 122.187 78.3242 121.915 78.4102C121.643 78.4889 121.342 78.5283 121.013 78.5283C120.669 78.5283 120.354 78.4854 120.067 78.3994C119.781 78.3063 119.523 78.1774 119.294 78.0127C119.065 77.848 118.861 77.6582 118.681 77.4434C118.51 77.2214 118.359 76.9814 118.23 76.7236V71.6426C118.352 71.3848 118.499 71.1484 118.671 70.9336C118.85 70.7116 119.054 70.5182 119.283 70.3535C119.505 70.196 119.759 70.0742 120.046 69.9883C120.332 69.8952 120.647 69.8486 120.991 69.8486C121.306 69.8486 121.593 69.8844 121.85 69.9561C122.108 70.0277 122.341 70.1279 122.549 70.2568C122.849 70.4359 123.104 70.6829 123.311 70.998C123.519 71.3132 123.687 71.6605 123.816 72.04C123.909 72.348 123.977 72.6774 124.02 73.0283C124.07 73.3721 124.096 73.7266 124.096 74.0918ZM130.462 84.6943C130.985 84.6943 131.447 84.5977 131.848 84.4043C132.249 84.2109 132.6 83.971 132.901 83.6846C133.201 83.3981 133.456 83.0866 133.663 82.75C133.878 82.4134 134.054 82.0947 134.19 81.7939L140.087 68.377H137.864L134.867 75.918L134.319 77.2822L133.803 75.875L130.613 68.377H128.389L133.395 79.4521L132.6 80.999C132.528 81.1423 132.428 81.3249 132.299 81.5469C132.177 81.7689 132.031 81.9837 131.859 82.1914C131.68 82.3991 131.476 82.5781 131.246 82.7285C131.024 82.8789 130.777 82.9541 130.505 82.9541C130.405 82.9541 130.265 82.9469 130.086 82.9326C129.914 82.9255 129.739 82.9147 129.56 82.9004L129.238 84.5225C129.367 84.5511 129.556 84.5869 129.807 84.6299C130.058 84.6729 130.276 84.6943 130.462 84.6943Z"
      fill="white"
    />
    <g clipPath="url(#clip0)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M198.007 74.6343H194.14C194.126 74.6344 194.113 74.6313 194.1 74.6251C194.087 74.6189 194.076 74.6099 194.068 74.5988C194.06 74.5878 194.054 74.575 194.051 74.5614C194.049 74.5478 194.049 74.5338 194.053 74.5205L195.986 67.8548C195.991 67.8356 196.002 67.8185 196.018 67.8063C196.034 67.7942 196.053 67.7876 196.073 67.7876C196.093 67.7876 196.112 67.7942 196.128 67.8063C196.144 67.8185 196.155 67.8356 196.16 67.8548L198.093 74.5205C198.097 74.5338 198.098 74.5478 198.095 74.5614C198.092 74.575 198.087 74.5878 198.078 74.5988C198.07 74.6097 198.059 74.6186 198.047 74.6248C198.035 74.6309 198.021 74.6342 198.007 74.6343ZM199.807 80.4075H202.319L198.489 67.1958C198.334 66.676 198.015 66.2202 197.58 65.8962C197.144 65.5721 196.616 65.3971 196.074 65.3971C195.531 65.3971 195.003 65.5721 194.568 65.8962C194.133 66.2202 193.814 66.676 193.659 67.1958L189.827 80.4089H192.346L193.453 76.5833C193.459 76.5645 193.47 76.5479 193.486 76.5362C193.502 76.5244 193.521 76.5182 193.54 76.5183H198.603C198.622 76.5182 198.642 76.5244 198.657 76.5362C198.673 76.5479 198.685 76.5645 198.69 76.5833L199.807 80.4075ZM213.966 72.8197H215.444C215.468 72.8197 215.49 72.8292 215.507 72.8461C215.524 72.863 215.534 72.886 215.534 72.9099V78.1215C215.538 78.7837 215.806 79.4171 216.276 79.8827C216.747 80.3483 217.384 80.6082 218.046 80.6055C218.546 80.6064 219.044 80.5347 219.523 80.3927V78.6801C219.246 78.7037 218.932 78.72 218.7 78.72C218.504 78.72 218.317 78.6421 218.178 78.5036C218.039 78.365 217.962 78.1771 217.962 77.9812V72.9084C217.962 72.8845 217.971 72.8616 217.988 72.8447C218.005 72.8277 218.028 72.8183 218.052 72.8183H219.529V70.9357H218.052C218.028 70.9357 218.005 70.9262 217.988 70.9093C217.971 70.8924 217.962 70.8695 217.962 70.8456V67.7174H215.525V70.8456C215.525 70.8695 215.515 70.8924 215.499 70.9093C215.482 70.9262 215.459 70.9357 215.435 70.9357H213.957L213.966 72.8197ZM227.934 80.4075H230.35V73.8659C230.344 73.0326 230.007 72.2358 229.414 71.6503C228.821 71.0648 228.02 70.7382 227.187 70.7422C226.187 70.7611 225.214 71.0629 224.379 71.6125C224.365 71.6208 224.349 71.6252 224.332 71.6252C224.316 71.6252 224.3 71.6208 224.286 71.6125C224.272 71.6048 224.26 71.5935 224.252 71.5798C224.243 71.566 224.239 71.5503 224.239 71.5342V65.5911H221.811V80.4075H224.233V73.3251C224.233 73.3086 224.237 73.2923 224.246 73.2782C224.254 73.2641 224.267 73.2527 224.281 73.2453C224.737 73.0133 225.635 72.6232 226.535 72.6232C226.903 72.6219 227.257 72.767 227.519 73.0266C227.648 73.1526 227.75 73.303 227.82 73.4689C227.89 73.6348 227.926 73.8129 227.927 73.993V80.4016L227.934 80.4075ZM203.674 70.9357V77.4773C203.68 78.3114 204.016 79.1093 204.609 79.6957C205.202 80.2822 206.004 80.6094 206.838 80.6055C207.956 80.5862 209.039 80.2127 209.932 79.5386C209.944 79.5297 209.957 79.5237 209.972 79.5212C209.986 79.5186 210.001 79.5195 210.015 79.5238C210.029 79.5282 210.041 79.5358 210.052 79.5461C210.062 79.5564 210.07 79.569 210.074 79.5829L210.329 80.4089H212.219V70.9357H209.792V78.0196C209.792 78.0361 209.787 78.0522 209.778 78.0663C209.77 78.0804 209.758 78.0918 209.743 78.0994C209.288 78.3314 208.389 78.7215 207.489 78.7215C207.123 78.723 206.77 78.5791 206.509 78.3213C206.248 78.0634 206.1 77.7126 206.097 77.3458V70.9357H203.674ZM237.43 78.7215C236.691 78.7215 236.1 78.3048 235.631 77.4477C235.068 76.4134 234.758 74.8338 234.758 73.0015C234.758 71.1692 235.068 69.5896 235.631 68.5552C236.097 67.6982 236.685 67.2815 237.43 67.2815C238.174 67.2815 238.759 67.6982 239.228 68.5552C239.791 69.5896 240.101 71.1692 240.101 73.0015C240.101 74.8338 239.791 76.4134 239.228 77.4477C238.762 78.3033 238.174 78.7215 237.43 78.7215ZM237.43 65.396C235.872 65.396 234.554 66.1215 233.62 67.4943C232.686 68.867 232.2 70.7628 232.2 73.0015C232.2 75.2401 232.691 77.1389 233.62 78.5087C234.55 79.8785 235.872 80.6069 237.43 80.6069C238.987 80.6069 240.305 79.8814 241.239 78.5087C242.173 77.1359 242.659 75.2372 242.659 73C242.659 70.7628 242.168 68.8626 241.239 67.4928C240.31 66.123 238.987 65.3945 237.43 65.3945V65.396Z"
        fill="white"
      />
      <path
        d="M181.928 66.8884L178.709 57H168.311L171.525 66.8884H181.928ZM168.311 57H157.914L154.702 66.8884H165.099L168.311 57ZM154.702 66.8884C153.768 69.7626 153.768 72.8587 154.702 75.7329C155.636 78.6072 157.455 81.112 159.9 82.8884L163.113 73L154.702 66.8884ZM181.922 66.8884L173.505 73L176.717 82.8884C179.164 81.1136 180.986 78.6094 181.922 75.7351C182.858 72.8608 182.86 69.7639 181.928 66.8884H181.922ZM159.9 82.8884L168.312 89L176.723 82.8884L168.311 76.7769L159.9 82.8884Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="88.659"
          height="32"
          fill="white"
          transform="translate(154 57)"
        />
      </clipPath>
    </defs>
  </svg>
)

export default Branding
