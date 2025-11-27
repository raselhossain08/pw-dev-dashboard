import { apiClient } from "@/lib/api-client";

export interface CourseCategory {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateCategoryDto {
    name: string;
}

class CourseCategoriesService {
    async getAllCategories(): Promise<string[]> {
        try {
            const { data } = await apiClient.get<string[]>("/course-categories");
            return data;
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            throw error;
        }
    }

    async createCategory(categoryData: CreateCategoryDto): Promise<CourseCategory> {
        try {
            const { data } = await apiClient.post<CourseCategory>("/course-categories", categoryData);
            return data;
        } catch (error) {
            console.error("Failed to create category:", error);
            throw error;
        }
    }

    async deleteCategory(slug: string): Promise<void> {
        try {
            await apiClient.delete(`/course-categories/${slug}`);
        } catch (error) {
            console.error(`Failed to delete category ${slug}:`, error);
            throw error;
        }
    }
}

export const courseCategoriesService = new CourseCategoriesService();
export default courseCategoriesService;
