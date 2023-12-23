<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;

use App\Models\Post;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder; 

class AllPostsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('perPage', 10);
        $page = $request->get('page', 1);
        $posts = QueryBuilder::for(Post::class)
            ->allowedFilters(['title', AllowedFilter::exact('location'), 'skills'])
            ->allowedSorts('created_at', 'compensation')
            ->paginate($perPage, ['*'], 'page', $page);

        $posts->getCollection()->transform(function ($post) {
            $post->profile = $post->user->profileCompany;
            unset($post->user);
            return $post;
        });

        return response()->json([
            'data' => $posts->items(),
            'current_page' => $posts->currentPage(),
            'last_page' => $posts->lastPage(),
        ]);
    }

    public function getLocationsAndSkills()
    {
        $locations = Post::select('location')->distinct()->get()->pluck('location')->toArray();
        $skills = Post::select('skills')->distinct()->get()->pluck('skills')->toArray();
        foreach ($skills as &$skill) {
            $skill = explode(',', $skill);
        }
        return [
            'locations' => $locations,
            'skills' => $skills[0],
        ];
    }
}
