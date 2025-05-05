namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Berita;
use Carbon\Carbon;

class BeritaController extends Controller
{
public function index()
{
return Berita::all();
}

public function show($id)
{
return Berita::findOrFail($id);
}

public function store(Request $request)
{
$berita = Berita::create($request->all());
return response()->json($berita, 201);
}

public function update(Request $request, $id)
{
$berita = Berita::findOrFail($id);
$berita->update($request->all());
return response()->json($berita);
}

public function destroy($id)
{
$berita = Berita::findOrFail($id);
$berita->delete();
return response()->json(null, 204);
}

public function incrementView($id)
{
$berita = Berita::findOrFail($id);
$berita->increment('views');
return response()->json(['views' => $berita->views]);
}

public function publishNow($id)
{
$berita = Berita::findOrFail($id);
$berita->status = 'TERTAYANG';
$berita->tanggal_terbit = Carbon::now();
$berita->save();

return response()->json(['message' => 'Berita diterbitkan sekarang.']);
}
}