//COMPLETED TRIANGLECUBE
//COMPLETED TRIANGLECUBE
//COMPLETED TRIANGLECUBE
//COMPLETED TRIANGLECUBE

/*
#include<stdio.h> // includes info about standard library
#include <stdlib.h> // malloc is part of this library
#include <io.h>
#include<windows.h>
#include <SDL.h>
#include <stdbool.h>
#include <stdint.h>
#include "vector.h"
#include "mesh.h"
#include "triangle.h"


#define FPS 30 //we want 30 fps
#define Frame_target_time  (1000/FPS) //we need to calc milsec how long the frames will last
int prev_frame_time = 0;

SDL_Window* window;
SDL_Renderer* renderer;
SDL_Texture* texture = NULL;
bool is_running = false;
uint32_t* color_buffer = NULL;



int window_width = 800;
int window_height = 600;
bool inFront;

bool initialize_windowing_system();
void setup_memory_buffer();
void process_keyboard_input();
void run_render_pipline();
void cleanup_windowing_system();
void update_state();
void clear_color_buffer(color);
void DrawGrid(uint32_t color);
void DrawRect(int x, int y, int width, int height, uint32_t color);
void DrawTri(int x0, int y0, int x1, int y1, int x2, int y2, uint32_t color);
void Drawdots();
void Drawline(int x0, int y0, int x1, int y1, uint32_t color);
void Drawpixels(int x, int y, uint32_t color);


// declare 2 arrays

vec3_t cube_model[N_MESH_VERTICES];
vec2_t projected_points[N_MESH_VERTICES];

int scaling_factor = 300;
vec2_t orthographic_project_point(vec3_t point_3d);
vec2_t perspective_project_point(vec3_t point_3d);
void build_cube_model();
void project_model();
void scale_shape();
//vec3_t camera_position = { 0, 0, 0 };
//int t_cnt = 0;
//triangle_t triangles_to_render[1000];

vec3_t camera_position = { 0,0,-5 };
vec3_t cube_rotation = { .x = 0,.y = 0,.z = 0 };

triangle_t triangles_to_render[N_MESH_FACES];


vec2_t victor;
vec2_t* L = &victor;
void normalize(vec2_t * v); //tells us the address of the variable. if we just pass in just the victor, you would be passing the value and it would not keep any changes
//normalize(&victor)




int main(void)
{
	is_running = initialize_windowing_system();
	if (!is_running) {
		return -1; // Exit if initialization fails
	}
	setup_memory_buffer();


	if (!color_buffer) {
		fprintf(stderr, "Memory allocation failed");
		cleanup_windowing_system();
		return -1; // Exit if memory allocation fails
	}
	while (is_running) {
		process_keyboard_input();
		update_state();
		run_render_pipline();

	}

	//gets rid of the memory that you have called
	cleanup_windowing_system();
	return 0;
}
void update_state() {

	clear_color_buffer(0x000000);
	//add more zeros to slow it down
	cube_rotation.x += 0.001;
	cube_rotation.y += 0.001;
	cube_rotation.z += 0.001;

	project_model();
	

	
	
	 for (int i = 0; i < N_MESH_FACES; i++) {
        triangle_t triangle = triangles_to_render[i];

        // Draw lines for each triangle
        DrawTri(
            triangle.points[0].x, triangle.points[0].y,
            triangle.points[1].x, triangle.points[1].y,
            triangle.points[2].x, triangle.points[2].y,
            0x05F8EC
        );
    }
	 run_render_pipline();
	
	int time_to_wait = Frame_target_time - (SDL_GetTicks() - prev_frame_time);
	
	if (time_to_wait > 0 && time_to_wait <= Frame_target_time) {
		SDL_Delay(time_to_wait);
	}
}


bool initialize_windowing_system() {

	if (SDL_Init(SDL_INIT_EVERYTHING) != 0) {
		fprintf(stderr, "SDLIntFailed");
		return false;
	}
	/*SDL_DisplayMode displaymode;
	SDL_GetCurrentDisplayMode(0, &displaymode);
	window_width = displaymode.w;
	window_height = displaymode.h;


	window = SDL_CreateWindow(NULL, SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, window_width, window_height, 0); // to put it in fullscreen:SDL_WINDOW_FULLSCREEN 

	if (!window) {
		fprintf(stderr, "CreateWindowFailed");
		return false;
	}

	renderer = SDL_CreateRenderer(window, -1, 0);

	if (!renderer) {
		fprintf(stderr, "CreateRendererFailed");
		return false;
	}
	return true;
}

void process_keyboard_input() {
	//need to declare SDL_event
	SDL_Event event;
	SDL_PollEvent(&event);
	switch (event.type) {
	case SDL_QUIT:
		is_running = false;
		break;

	case SDL_KEYDOWN:
		if (event.key.keysym.sym == SDLK_ESCAPE) {
			is_running = false;
		}
		break;
	}

}

void run_render_pipline() {

	SDL_UpdateTexture(texture, NULL, color_buffer, (int)(window_width * sizeof(uint32_t)));
	SDL_RenderCopy(renderer, texture, NULL, NULL);
	SDL_RenderPresent(renderer);

}


void cleanup_windowing_system() {
	free(color_buffer);
	SDL_DestroyRenderer(renderer);
	SDL_DestroyWindow(window);
	SDL_Quit();
}
void setup_memory_buffer() {
	color_buffer = (uint32_t*)malloc(window_width * window_height * sizeof(uint32_t));

	if (!color_buffer) {
		fprintf(stderr, "Memory allocation failed");
		exit(EXIT_FAILURE);
	}

	texture = SDL_CreateTexture(renderer, SDL_PIXELFORMAT_ARGB8888, SDL_TEXTUREACCESS_STREAMING, window_width, window_height);


}

void clear_color_buffer(uint32_t color) {
	for (int y = 0; y < window_height; y++) {
		for (int x = 0; x < window_width; x++) {
			color_buffer[(y * window_width) + x] = color;
		}
	}
}

void DrawGrid(uint32_t color) {
	uint32_t gridColor = color; // White color for the grid lines

	// Draw horizontal lines
	for (int y = 0; y < window_height; y += 80) {
		for (int x = 0; x < window_width; x++) {
			color_buffer[(y * window_width) + x] = gridColor;
		}
	}

	// Draw vertical lines
	for (int x = 0; x < window_width; x += 80) {
		for (int y = 0; y < window_height; y++) {
			color_buffer[(y * window_width) + x] = gridColor;
		}
	}
}

void DrawRect(int x, int y, int width, int height, uint32_t color) {




	for (int yPos = y; yPos < y + height; yPos++) {
		for (int xPos = x; xPos < x + width; xPos++) {
			color_buffer[(yPos * window_width) + xPos] = color;
		}
	}


}
void Drawdots() {
	int space = 0;
	for (int y = 0; y < window_height; y += 5) {
		for (int x = 0; x < window_width; x += 5) {
			color_buffer[(y * window_width) + x] = 0x0FF00000;

			if (space == 5)
				space = 0;
			else
				space++;
			x += 10;
		}
		y += 10;

	}
}


//a geometric model of a cube, create point and add to array of points
void build_cube_model() {
	int point_count = 0;
	for (float x = -1; x <= 1; x += 0.25) {
		for (float y = -1; y <= 1; y += 0.25) {
			for (float z = -1; z <= 1; z += 0.25) {
				vec3_t new_point = { .x = x, .y = y, .z = z };
				cube_model[point_count++] = new_point;
			}
		}
	}

}

//this function converts a 3d vector to 2d by droping the z paramater
vec2_t orthographic_project_point(vec3_t point_3d)
{
	//vec2_t projected_point = { .x = point_3d.x,point_3d.y };
	//return projected_point;
	vec2_t projected_point = {
		.x = (point_3d.x + 1.0f) * (window_width / 2.0f),
		.y = (1.0f - point_3d.y) * (window_height / 2.0f)
	};
	return projected_point;
}

vec2_t perspective_project_point(vec3_t point_3d)
{
	vec2_t projected_point = { .x = (scaling_factor * point_3d.x) / point_3d.z,
							   .y = (scaling_factor * point_3d.y) / point_3d.z
	};
	return projected_point;
}
void project_model()
{
	
	
	for (int i = 0; i < N_MESH_FACES; i++) {
		face_t mesh_face = mesh_faces[i];
		vec3_t face_vertices[3];

		// Retrieve vertices for the face
		face_vertices[0] = mesh_vertices[mesh_face.a - 1];
		face_vertices[1] = mesh_vertices[mesh_face.b - 1];
		face_vertices[2] = mesh_vertices[mesh_face.c - 1];

		triangle_t projected_triangle;

		// Project each vertex of the face
		for (int j = 0; j < 3; j++) {
			// Apply rotation to the vertex
			vec3_t transformed_vertex = face_vertices[j];
			//transformed_vertex = vec3_rotate_x(transformed_vertex, cube_rotation.x);
			transformed_vertex = vec3_rotate_y(transformed_vertex, cube_rotation.y);
			//transformed_vertex = vec3_rotate_z(transformed_vertex, cube_rotation.z);
			transformed_vertex.z -= camera_position.z;

			// Project the vertex onto the screen
			vec2_t projected_point = perspective_project_point(transformed_vertex);
			projected_point.x += (float)(window_width / 2);
			projected_point.y += (float)(window_height / 2);

			projected_triangle.points[j] = projected_point;
		}

		// Store the projected triangle for rendering
		triangles_to_render[i] = projected_triangle;
	}

}
	
void DrawTri(int x0, int y0, int x1, int y1, int x2, int y2,uint32_t color)
	{
		Drawline(x0, y0, x1, y1, color); //connects triangle sideways
		Drawline(x1, y1, x2, y2, color);  //draws the bottom but leaves top open
		Drawline(x2, y2, x0, y0, color); //draws the triangles and connects from top to bottom
		
		
	}




void Drawline(int x0, int y0, int x1, int y1, uint32_t color)
{
	//int delta_x = x1 - x0;
	//int delta_y = y1 - y0;

	//int longest_side = abs(delta_x) >= abs(delta_y) ? abs(delta_x) : (delta_y);

	//float x_inc = delta_x / (float)longest_side;
	//float y_inc = delta_y / (float)longest_side;
	//float x = x0;
	//float y = y0;
	//for (int i = 0; i <= longest_side; i++)
	//{
	//	Drawpixels( (int) x,(int) y, color); //create a function
	//		x += x_inc;
	//		y += y_inc;
	//}

	int delta_x = abs(x1 - x0);
	int delta_y = abs(y1 - y0);
	int sign_x = x0 < x1 ? 1 : -1;
	int sign_y = y0 < y1 ? 1 : -1;

	int error = delta_x - delta_y;

	int x = x0;
	int y = y0;

	while (x != x1 || y != y1) {
		Drawpixels(x, y, color);

		int error2 = 2 * error;

		if (error2 > -delta_y) {
			error -= delta_y;
			x += sign_x;
		}
		if (error2 < delta_x) {
			error += delta_x;
			y += sign_y;
		}
	}
	
}

 void Drawpixels(int x,int y, uint32_t color)
{
	 if (x >= 0 && x < window_width && y >= 0 && y < window_height) {
		 color_buffer[y * window_width + x] = color;
	 }
}

void scale_shape(int scale)
{
	//int scaling_factor = scale;
	for (int i = 0; i < N_MESH_VERTICES; i++) {
		projected_points[i].x *= scale;
		projected_points[i].y *= scale;


	}

}*/
