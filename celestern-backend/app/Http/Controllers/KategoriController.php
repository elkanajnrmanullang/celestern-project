namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kategori;

class KategoriController extends Controller
{
public function index()
{
return Kategori::withCount('berita')->get();
}

public function store(Request $request)
{
$kategori = Kategori::create($request->only('nama'));
return response()->json($kategori, 201);
}

public function update(Request $request, $id)
{
$kategori = Kategori::findOrFail($id);
$kategori->update($request->only('nama'));
return response()->json($kategori);
}

public function destroy($id)
{
$kategori = Kategori::findOrFail($id);
$kategori->delete();
return response()->json(null, 204);
}
}