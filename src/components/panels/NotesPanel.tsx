
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2, Edit2, Save, X, StickyNote } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export const NotesPanel: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Door Code', content: 'The new code for the rear entrance is 8842#', date: 'Oct 24' },
    { id: '2', title: 'Meeting Prep', content: 'Prepare slides for Q4 review with Elizabeth.', date: 'Oct 23' }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState<Partial<Note>>({});

  const handleSave = () => {
    if (!currentNote.title || !currentNote.content) return;

    if (currentNote.id) {
      // Update
      setNotes(prev => prev.map(n => n.id === currentNote.id ? { ...n, ...currentNote } as Note : n));
    } else {
      // Create
      const newNote: Note = {
        id: Date.now().toString(),
        title: currentNote.title,
        content: currentNote.content,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      };
      setNotes([newNote, ...notes]);
    }
    resetForm();
  };

  const handleEdit = (note: Note) => {
    setCurrentNote(note);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const resetForm = () => {
    setCurrentNote({});
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {!isEditing ? (
        <>
          <Button 
            onClick={() => setIsEditing(true)} 
            className="w-full" 
            leftIcon={Plus}
          >
            Create New Note
          </Button>

          <div className="space-y-4">
            {notes.map(note => (
              <div key={note.id} className="group bg-yellow-50/50 p-5 rounded-xl border border-yellow-100 hover:shadow-md transition-all relative">
                 <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-secondary">{note.title}</h4>
                    <span className="text-xs text-gray-400 bg-white/50 px-2 py-0.5 rounded-full">{note.date}</span>
                 </div>
                 <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                 
                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button onClick={() => handleEdit(note)} className="p-1.5 bg-white rounded-lg text-primary hover:text-primary-hover shadow-sm">
                       <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(note.id)} className="p-1.5 bg-white rounded-lg text-red-400 hover:text-red-500 shadow-sm">
                       <Trash2 className="w-3.5 h-3.5" />
                    </button>
                 </div>
              </div>
            ))}
            {notes.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No notes yet.</p>
                </div>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-4 animate-in slide-in-from-right-4 fade-in">
           <div className="flex items-center justify-between">
              <h3 className="font-bold text-secondary">{currentNote.id ? 'Edit Note' : 'New Note'}</h3>
              <Button variant="ghost" size="sm" onClick={resetForm}><X className="w-4 h-4" /></Button>
           </div>
           
           <div className="space-y-4">
              <Input 
                label="Title"
                placeholder="Note Title" 
                value={currentNote.title || ''}
                onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                autoFocus
              />
              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Content</label>
                <textarea 
                  className="w-full bg-surface-subtle border border-gray-200 text-secondary rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all min-h-[150px] resize-none"
                  placeholder="Write your note here..."
                  value={currentNote.content || ''}
                  onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                 <Button className="flex-1" onClick={handleSave} leftIcon={Save}>Save Note</Button>
                 <Button variant="ghost" onClick={resetForm}>Cancel</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
