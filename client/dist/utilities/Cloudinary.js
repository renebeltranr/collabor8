var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
export const upVideoToCloudinary = (blob) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.cloudinary.com/v1_1/dvyn9lzkf/upload";
    let cloudinaryData = {};
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", "acgvtxok");
    yield axios.post(url, formData).then((response) => {
        cloudinaryData = response.data;
    });
    return cloudinaryData;
});
//# sourceMappingURL=Cloudinary.js.map