import { apiClient } from "@/lib/api-client";

export interface Course {
    _id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    instructor: {
        _id: string;
        name: string;
        avatar?: string;
    };
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    price: number;
    discountPrice?: number;
    duration: number;
    lessonsCount: number;
    enrollmentsCount: number;
    rating: number;
    reviewsCount: number;
    isPublished: boolean;
    isFeatured: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateCourseDto {
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    price: number;
    discountPrice?: number;
    tags?: string[];
    isPublished?: boolean;
    isFeatured?: boolean;
}

export type UpdateCourseDto = Partial<CreateCourseDto>

class CoursesService {
    async getAllCourses(params: {
        page?: number;
        limit?: number;
        search?: string;
        category?: string;
        level?: string;
        isPublished?: boolean;
    } = {}) {
        try {
            const { data } = await apiClient.get("/courses", { params });
            return data;
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            throw error;
        }
    }

    async getCourseById(id: string) {
        try {
            const { data } = await apiClient.get(`/courses/${id}`);
            return data;
        } catch (error) {
            console.error(`Failed to fetch course ${id}:`, error);
            throw error;
        }
    }

    async createCourse(courseData: CreateCourseDto) {
        try {
            const { data } = await apiClient.post("/courses", courseData);
            return data;
        } catch (error) {
            console.error("Failed to create course:", error);
            throw error;
        }
    }

    async updateCourse(id: string, courseData: UpdateCourseDto) {
        try {
            const { data } = await apiClient.put(`/courses/${id}`, courseData);
            return data;
        } catch (error) {
            console.error(`Failed to update course ${id}:`, error);
            throw error;
        }
    }

    async deleteCourse(id: string) {
        try {
            await apiClient.delete(`/courses/${id}`);
        } catch (error) {
            console.error(`Failed to delete course ${id}:`, error);
            throw error;
        }
    }

    async publishCourse(id: string) {
        try {
            const { data } = await apiClient.patch(`/courses/${id}/publish`);
            return data;
        } catch (error) {
            console.error(`Failed to publish course ${id}:`, error);
            throw error;
        }
    }

    async unpublishCourse(id: string) {
        try {
            const { data } = await apiClient.patch(`/courses/${id}/unpublish`);
            return data;
        } catch (error) {
            console.error(`Failed to unpublish course ${id}:`, error);
            throw error;
        }
    }

    async duplicateCourse(id: string) {
        try {
            const { data } = await apiClient.post(`/courses/${id}/duplicate`);
            return data;
        } catch (error) {
            console.error(`Failed to duplicate course ${id}:`, error);
            throw error;
        }
    }
}

export const coursesService = new CoursesService();
export default coursesService;
